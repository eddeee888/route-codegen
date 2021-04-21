export interface CommandFlags {
  verbose: boolean;
}

// This is the default commandFlags. This is what used across the whole run & in tests
export const commandFlags: CommandFlags = {
  verbose: false,
};

export const handleCommandFlags = (suppliedCommandFlags: CommandFlags): void => {
  commandFlags.verbose = suppliedCommandFlags.verbose;
};
