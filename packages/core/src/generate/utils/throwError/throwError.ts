const throwError = (path: string[], message: string): never => {
  const errorMessage = path.length > 0 ? `${path.join(".")} - ${message}` : message;
  throw new Error(`[ERROR] ${errorMessage}`);
};

export default throwError;
