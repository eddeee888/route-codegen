export interface CommandFlags {
  verbose: boolean;
}

// This is the default commandFlags. This is what used across the whole run & in tests
const commandFlags: CommandFlags = {
  verbose: false,
};

const handleCommandFlags = (suppliedCommandFlags: CommandFlags): void => {
  commandFlags.verbose = suppliedCommandFlags.verbose;
};

export { commandFlags };

export default handleCommandFlags;
