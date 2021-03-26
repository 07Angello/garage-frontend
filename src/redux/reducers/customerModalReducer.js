import { types } from "../types/types";

const initialState = {
    customerModalIsOpen: false,
}

export const customerModalReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.customerOpenModal:
            return {
                ...state,
                customerModalIsOpen: true
            }

        case types.customerCloseModal:
            return {
                ...state,
                customerModalIsOpen: false
            }
    
        default:
            return state;
    }
}