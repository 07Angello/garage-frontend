import { types } from "../types/types";
import produce from 'immer';

const initialState = {
    customers: []
}

export const customerReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.customerAddNew:
            return {
                ...state,
                customers: [
                    action.payload,
                    ...state.customers
                ]
            }

        case types.customerGottenFiltered:
            return {
                ...state,
                customers: [ 
                    ...action.payload
                ]
            }

        case types.customerDelete:
            return {
                ...state,
                customers: state.customers.filter(
                    customer => ( customer._id !== action.payload )
                ),
            }

        case types.customerUpdate:
            return {
                ...state,
                customers: state.customers.map(
                    customer => ( customer._id === action.payload._id ) ? action.payload : customer
                )
            }

        case types.customersLogout:
            return {
                ...initialState
            }

        case types.customerAddNewCar:
            return produce(state, (draft) => {
                draft.customers.map((customer) => {
                    if (customer._id === action.payload.customer) {
                        return customer.cars.push({...action.payload});
                    }

                    return customer.cars;
                })
            });
        
        case types.customerAddNewMaintenance:
            return produce(state, (draft) => {
                draft.customers.map((customer) => {
                    customer.cars.map((car) => {
                        if (car._id === action.payload.car) {
                            car.maintenances.push({...action.payload});
                        }
                    });
                })
            });

        case types.customerEditCar:
            return produce(state, (draft) => {
                draft.customers.map((customer) => {
                    if (customer._id === action.payload.customer) {
                        for( let i = 0; i < customer.cars.length; i++) { 
                            if ( customer.cars[i]._id === action.payload._id) { 
                                customer.cars[i] = action.payload;
                            }
                        }
                    }

                    return customer.cars;
                })
            });

        case types.customerDeleteCar:
            return produce(state, (draft) => {
                draft.customers.map((customer) => {
                    if (customer._id === action.payload.customer) {
                        for( let i = 0; i < customer.cars.length; i++) { 
                            if ( customer.cars[i]._id === action.payload._id) { 
                                return customer.cars.splice(i, 1); 
                            }
                        }
                    }

                    return customer.cars;
                })
            });

    
        default:
            return state;
    }
}
