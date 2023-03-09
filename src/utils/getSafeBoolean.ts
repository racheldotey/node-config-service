export const getSafeBoolean = (value?: any) => {
    if(value === true) return true;
    else if (!!value == false) return false;

    return !!(typeof value === "string" && 'true' === `${value}`.toLowerCase());
};