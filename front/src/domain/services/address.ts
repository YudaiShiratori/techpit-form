export const ADDRESS = {
    postalcode: "郵便番号",
    PREFECTURE: "都道府県",
    CITY: "市区町村",
    RESTADDRES: " 番地以下"
};

export const ispostalcode = (target: string) =>
    /^(\d{0,7}|\d{0,3}|\d{3}-\d{0,4})$/.test(target);

export const isCompletepostalcode = (target: string) =>
    /^(\d{7}|\d{3}-\d{4})$/.test(target);
export const sanitizepostalcode = (target: string) => target.replace(/-/, "");