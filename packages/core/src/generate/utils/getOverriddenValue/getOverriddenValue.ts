const getOverriddenValue = <P>(defaultValue: P, overriddenValue?: P): P => (overriddenValue !== undefined ? overriddenValue : defaultValue);

export default getOverriddenValue;
