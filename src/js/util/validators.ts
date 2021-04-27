const composeValidators = (...validators) => (value) => validators.reduce((e, validator) => e || validator(value), false);

export const required = (value: string): string => (value ? undefined : `This field is required`);