import { types } from "../types/types";

const initialState = {
    maintenanceModalIsOpen: false,
}

export const maintenanceModalReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.maintenanceOpenModal:
            return {
                ...state,
                maintenanceModalIsOpen: true
            }

        case types.maintenanceCloseModal:
            return {
                ...state,
                maintenanceModalIsOpen: false
            }
    
        default:
            return state;
    }
}