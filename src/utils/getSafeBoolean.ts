export const getSafeBoolean = (value?: any) => {
    if(value === true) return true;
    else if (Boolean(value) == false) return false;

    return Boolean(typeof value === "string" && 'true' === `${value}`.toLowerCase());
};