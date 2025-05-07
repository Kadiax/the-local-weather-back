export const validateEnv = (requiredVars: string[]) => {
  requiredVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`${key} is not defined in the environment variables`);
    }
  });
};
