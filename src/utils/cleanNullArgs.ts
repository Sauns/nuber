const cleanNullArgs = (args: object): object => {
  const notNullArgs = {};

  Object.keys(args).forEach((key) => {
    if (args[key] !== null) {
      notNullArgs[key] = args[key];
    }
  });

  return notNullArgs;
};

export default cleanNullArgs;
