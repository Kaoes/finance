export const getValueFromPrice = (price: string) => parseFloat(price.split(' ')[0].replace(',', '.'));

export const getValueOf = (data: any, name: string, defaultValue: string = '') => {
    if (!data[name]) {
        return defaultValue;
    }

    return data[name].value;
};

export const frenchToNumberFloat = (badFormatStr: string) => parseFloat(badFormatStr.replace(',', '.'));
