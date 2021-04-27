import { commandFlags } from "../handleCommandFlags";

export const info = (path: string[], message: string): void => {
  if (commandFlags.verbose) {
    const infoMessage = path.length > 0 ? `${path.join(".")} - ${message}` : message;
    console.info(`[INFO] ${infoMessage}`);
  }
};
