const log = (path: string[], message: string): void => {
  console.log(`${path.join('.')} - ${message}`);
};

export default log;
