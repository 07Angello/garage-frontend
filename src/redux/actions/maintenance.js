import { fetchWithToken } from "../../helpers/fetch";
import { types } from "../types/types";
import { toast } from 'react-toastify';

export const startAddNewMaintenance = ( maintenance ) => {
    return async( dispatch ) => {
        const response = await fetchWithToken('maintenances', {...maintenance}, 'POST');
        const { Data, Message, OK } = await response.json();

        if (!OK && Message.length > 0 && Message) {
            toast.warning( Message );
        } else {
            console.log(Data);
            dispatch( maintenanceAddNew( Data ) );
            toast.success('Maintenance created.');
        }
    }
}

export const startingDeleteMaintenance = ( maintenanceId ) => {
    return async( dispatch ) => {
        const response = await fetchWithToken(`maintenances/${ maintenanceId }`, {}, 'DELETE');
        const { Data, Message, OK } = await response.json();

        if (!OK && Message.length > 0 && Message) {
            toast.warning( Message );
        } else {
            dispatch( deleteMaintenance( Data._id ) );

            toast.success('The maintenance has been removed.');
        }
    }
}

export const startEditingMaintenance = ( maintenance ) => {
    return async( dispatch ) => {
        const response = await fetchWithToken(`maintenances/${ maintenance._id }`, { ...maintenance }, 'PUT');
        const { Data, Message, OK } = await response.json();

        if ( !OK && Message.length > 0 && Message ) {
            toast.warning( Message );
        } else {
            dispatch( maintenanceUpdate( Data ) );

            toast.success( 'Maintenance updated.' );
        }
    }
}

export const maintenanceLogout = () => ({
    type: types.maintenancesLogout
});

const deleteMaintenance = ( maintenanceId ) => ({
    type: types.customerDeleteMaintenance,
    payload: maintenanceId
});


const maintenanceAddNew = ( maintenance ) => ({
    type: types.customerAddNewMaintenance,
    payload: maintenance
});

const maintenanceUpdate = ( maintenance ) => ({
    type: types.customerEditMaintenance,
    payload: maintenance
});
