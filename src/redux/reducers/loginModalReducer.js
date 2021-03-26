import { types } from "../types/types";

const initialState = {
    modalIsOpen: false,
}

export const loginModalReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.loginOpenModal:
            return {
                ...state,
                modalIsOpen: true
            }

        case types.loginCloseModal:
            return {
                ...state,
                modalIsOpen: false
            }
    
        default:
            return state;
    }
}