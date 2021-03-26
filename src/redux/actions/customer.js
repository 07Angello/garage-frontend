import { fetchWithToken } from "../../helpers/fetch";
import { types } from "../types/types";
import { toast } from 'react-toastify';

export const startAddNewCustomer = ( customer ) => {
    return async( dispatch ) => {
        const response = await fetchWithToken('customers', {...customer}, 'POST');
        const { Data, Message, OK } = await response.json();

        if (!OK && Message.length > 0 && Message) {
            toast.warning( Message );
        } else {
            dispatch( customerAddNew( Data ) );
            toast.success('Customer created.');
        }
    }
}

export const startGettingCustomersFiltered = ( customerName ) => {
    return async( dispatch ) => {

        try {
            let customerFilter = customerName === null || customerName === '' || customerName.length === 0 ? 'ALL' : customerName;
            const response = await fetchWithToken(`customers/${ customerFilter }`);
            const { Data, Message, OK } = await response.json();

            if (!OK && Message.length > 0 && Message) {
                toast.warning( Message );
            } else {
                const customers =  Data;
                dispatch( customersFiltered( customers ) );
            }
        } catch (error) {
            console.log(error);
            toast.error('An error has ocurred while the customers were LOADING!');
        }

    }
}

export const startingDeleteCustomer = ( customerId ) => {
    return async( dispatch ) => {
        const response = await fetchWithToken(`customers/${ customerId }`, {}, 'DELETE');
        const { Data, Message, OK } = await response.json();

        if (!OK && Message.length > 0 && Message) {
            toast.warning( Message );
        } else {
            dispatch( deleteCustomer( Data._id ) );

            toast.success('The customer has been removed.');
        }
    }
}

export const startEditingCustomer = ( customer ) => {
    return async( dispatch ) => {
        const response = await fetchWithToken(`customers/${ customer._id }`, { ...customer }, 'PUT');
        const { Data, Message, OK } = await response.json();

        if ( !OK && Message.length > 0 && Message ) {
            toast.warning( Message );
        } else {
            dispatch( customerUpdate( Data ) );

            toast.success( 'Customer updated.' );
        }
    }
}

export const customersLogout = () => ({
    type: types.customersLogout
})

const deleteCustomer = ( customerId ) => ({
    type: types.customerDelete,
    payload: customerId
});


const customerAddNew = ( customer ) => ({
    type: types.customerAddNew,
    payload: customer
});

const customersFiltered = ( customers ) => ({
    type: types.customerGottenFiltered,
    payload: customers
});

const customerUpdate = ( customer ) => ({
    type: types.customerUpdate,
    payload: customer
});
