import { commandFlags } from '../../handleCommandFlags';

const info = (path: string[], message: string): void => {
  if (commandFlags.verbose) {
    console.info(`INFO: ${path.join('.')} - ${message}`);
  }
};

export default info;
