import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
  EmailSignUpMutationArgs,
  EmailSingInResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSingInResponse> => {
      const { email, phoneNumber } = args;

      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return {
            ok: false,
            error: "You should log instead",
            token: null,
          };
        } else {
          const phoneVerification = await Verification.findOne({
            payload: phoneNumber,
            verified: true,
          });

          if (phoneVerification) {
            const newUser = await User.create({ ...args }).save();

            if (newUser.email) {
              const emailVerificantion = await Verification.create({
                payload: newUser.email,
                target: "EMAIL",
              }).save();

              await sendVerificationEmail(
                newUser.fullName,
                emailVerificantion.key
              );
            }

            const token = createJWT(newUser.id);

            return {
              ok: true,
              error: null,
              token,
            };
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null,
            };
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
