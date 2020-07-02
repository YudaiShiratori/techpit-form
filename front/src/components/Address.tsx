import React from "react";
import { TextField } from "@material-ui/core";
import { PROFILE } from "../domain/services/profile";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { Address as IAddress } from "../domain/entity/address";
import profileActions from "../store/profile/actions";
import { ispostalcode } from "../domain/services/address";
import { searchAddressFrompostalcode } from "../store/profile/effects";

const Address = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile);
    const validation = useSelector((state: RootState) => state.validation);
    const classes = useStyles();

    const handleAddressChange = (member: Partial<IAddress>) => {
        dispatch(profileActions.setAddress(member))
    }

    const handlepostalcodeChange = (code: string) => {
        if (!ispostalcode(code)) return;
        dispatch(profileActions.setAddress({ postalcode: code }))
        dispatch(searchAddressFrompostalcode(code))
    }

    return (
        <>
            <TextField
                fullWidth
                className={classes.formField}
                label={PROFILE.ADDRESS.postalcode}
                required
                error={!!validation.message.address.postalcode}
                helperText={validation.message.address.postalcode}
                value={profile.address.postalcode}
                onChange={e => handlepostalcodeChange(e.target.value)}
            />
            <TextField
                fullWidth
                className={classes.formField}
                label={PROFILE.ADDRESS.PREFECTURE}
                required
                error={!!validation.message.address.prefecture}
                helperText={validation.message.address.prefecture}
                value={profile.address.prefecture}
                onChange={e => handleAddressChange({ prefecture: e.target.value })}
            />
            <TextField
                fullWidth
                className={classes.formField}
                label={PROFILE.ADDRESS.CITY}
                required
                error={!!validation.message.address.city}
                helperText={validation.message.address.city}
                value={profile.address.city}
                onChange={e => handleAddressChange({ city: e.target.value })}
            />
            <TextField
                fullWidth
                className={classes.formField}
                label={PROFILE.ADDRESS.RESTADDRES}
                error={!!validation.message.address.restAddress}
                helperText={validation.message.address.restAddress}
                value={profile.address.restAddress}
                onChange={e => handleAddressChange({ restAddress: e.target.value })}
            />
        </>
    );
};

export default Address;