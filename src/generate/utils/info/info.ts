import { verbose } from '../../../bin/route-codegen';

const info = (path: string[], message: string): void => {
  if (verbose) {
    console.info(`INFO: ${path.join('.')} - ${message}`);
  }
};

export default info;
