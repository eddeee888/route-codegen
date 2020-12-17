const getOverriddenValue = <P>(defaultValue: P, overriddenValue?: P) => (overriddenValue !== undefined ? overriddenValue : defaultValue);

export default getOverriddenValue;
