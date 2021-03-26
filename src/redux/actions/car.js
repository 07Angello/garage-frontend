import { fetchWithToken } from "../../helpers/fetch";
import { types } from "../types/types";
import { toast } from 'react-toastify';

export const startAddNewCar = ( car ) => {
    return async( dispatch ) => {
        const response = await fetchWithToken('cars', {...car}, 'POST');
        const { Data, Message, OK } = await response.json();

        if (!OK && Message.length > 0 && Message) {
            toast.warning( Message );
        } else {
            dispatch( carAddNew( Data ) );
            toast.success('Car created.');
        }
    }
}

export const startingDeleteCar = ( carId ) => {
    return async( dispatch ) => {
        const response = await fetchWithToken(`cars/${ carId }`, {}, 'DELETE');
        const { Data, Message, OK } = await response.json();

        if (!OK && Message.length > 0 && Message) {
            toast.warning( Message );
        } else {
            dispatch( deleteCar( Data ) );

            toast.success('The car has been removed.');
        }
    }
}

export const startEditingCar = ( car ) => {
    return async( dispatch ) => {
        const response = await fetchWithToken(`cars/${ car._id }`, { ...car }, 'PUT');
        const { Data, Message, OK } = await response.json();

        if ( !OK && Message.length > 0 && Message ) {
            toast.warning( Message );
        } else {
            dispatch( carUpdate( Data ) );

            toast.success( 'Car updated.' );
        }
    }
}

export const carLogout = () => ({
    type: types.carsLogout
});

const deleteCar = ( car ) => ({
    type: types.customerDeleteCar,
    payload: car
});


const carAddNew = ( car ) => ({
    type: types.customerAddNewCar,
    payload: car
});

const carUpdate = ( car ) => ({
    type: types.customerEditCar,
    payload: car
});
