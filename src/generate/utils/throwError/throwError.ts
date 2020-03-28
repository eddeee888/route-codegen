const throwError = (path: string[], message: string): never => {
  throw new Error(`ERROR: ${path.join('.')} - ${message}`);
};

export default throwError;
