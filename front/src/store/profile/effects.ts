import { Dispatch } from "redux";
import profileActions from "./actions";
import { Address } from "../../domain/entity/address";
import { isCompletepostalcode, sanitizepostalcode } from "../../domain/services/address";

export const searchAddressFrompostalcode = (code: string) => async (
    dispach: Dispatch
) => {
    if (!isCompletepostalcode(code)) return;
    dispach(profileActions.searchAddress.started({}));

    const result = await fetch(
        `https://apis.postcode-jp.com/api/v3/postcodes?apikey=ad187cd9f52d7ced&postcode=${sanitizepostalcode(
            code
        )}`
    ).then(res => res.json());

    if (!result.data[0]) return;

    const address: Partial<Address> = {
    prefecture: result.data[0].pref,
    city: result.data[0].city + result.data[0].town
    };

    dispach(profileActions.searchAddress.done({ result: address, params: {} }));
};
