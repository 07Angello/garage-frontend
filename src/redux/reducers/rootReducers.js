import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { customerModalReducer } from "./customerModalReducer";
import { customerReducer } from "./customerReducer";
import { loginModalReducer } from "./loginModalReducer";
import { maintenanceModalReducer } from "./maintenanceModal";


export const rootReducer = combineReducers({
    auth: authReducer,
    loginModal: loginModalReducer,
    customer: customerReducer,
    customerModal: customerModalReducer,
    maintenanceModal: maintenanceModalReducer
});
