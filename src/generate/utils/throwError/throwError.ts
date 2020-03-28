const throwError = (path: string[], message: string): never => {
  throw new Error(`${path.join('.')} - ${message}`);
};

export default throwError;
