import { SayHelloQueryArgs, sayHelloResponse } from "src/types/graph";

const resolvers = {
  Query: {
    sayHello: (_, args: SayHelloQueryArgs): sayHelloResponse => {
      return {
        error: false,
        text: `love you ${args.name}`,
      };
    },
  },
};

export default resolvers;
