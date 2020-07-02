import { Career } from "../entity/career";

export const CAREERS = {
    COMPANY: "会社名",
    POSITION: "役職",
    SPAN: "期間",
};

const isEmptyCarrer = (career: Career) => {
    return Object.values(career).every(v => !v)
}

export const exitEmptyCarrers = (careers: Career[]) =>
    careers.some(c => isEmptyCarrer(c))