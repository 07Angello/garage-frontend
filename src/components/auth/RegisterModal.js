import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { loginCloseModal } from '../../redux/actions/loginModal';
import { toast } from 'react-toastify';

import './authStyles.css';
import { startRegister } from '../../redux/actions/auth';

const initialFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

Modal.setAppElement('#root');
export const RegisterModal = () => {

    const customStyles = {
        content: {
            top : '50%',
            left : '50%',
            right : 'auto',
            bottom : 'auto',
            marginRight : '-50%',
            transform : 'translate(-50%, -50%)'
        }
    }

    const { modalIsOpen } = useSelector( state => state.loginModal );

    const dispatch = useDispatch();

    const [registerFormValues, setRegisterFormValues] = useState( initialFormValues );
    const { name, email, password, confirmPassword } = registerFormValues;

    const [nameIsValid, setNameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);

    const resetRegisterFormState = () => {
        setNameIsValid(true);
        setEmailIsValid(true);
        setPasswordIsValid(true);
        setConfirmPasswordIsValid(true);
    }

    const closeRegisterModal = () => {
        dispatch( loginCloseModal() );
    }

    const handleInputChange = ({ target }) => {
        setRegisterFormValues({
            ...registerFormValues,
            [target.name]: target.value
        })

        resetRegisterFormState();
    }

    const saveRegisterForm = ( event ) => {
        event.preventDefault();

        if (name.length === 0 || !name) return setNameIsValid(false);
        if (email.length === 0 || !email) return setEmailIsValid(false);
        if (password.length === 0 || !password) return setPasswordIsValid(false);
        if (confirmPassword.length === 0 || !confirmPassword) return setConfirmPasswordIsValid(false);

        if (confirmPassword !== password){
            setConfirmPasswordIsValid(false);
            setPasswordIsValid(false);
            toast.warning('WARNING! Password and confirm password does not match');
            return;
        }

        if ( password.length < 6 ) {
            setConfirmPasswordIsValid(false);
            setPasswordIsValid(false);
        }

        dispatch( startRegister(email, password, name) );
    }

    const signUp = () => {

    }

    return (
        <div>
            <Modal
                isOpen={ modalIsOpen }
                onRequestClose={ closeRegisterModal }
                style={ customStyles }
                closeTimeoutMS={ 100 }
                className="modal"
                overlayClassName="modal-background"
            >
                <div className="pl-3 pr-3">
                    <h2>Sign Up</h2>
                    <p>It's quick and easy.</p>
                    <i onClick={ closeRegisterModal } className="bi bi-x register-form-x"></i>
                </div>
                
                <hr/>

                <form
                    className="container"
                    onSubmit={ saveRegisterForm }
                >
                    <div className="form-group">
                        <input
                            type="text"
                            className={`form-control ${ !nameIsValid && 'is-invalid' }`}
                            placeholder="Full Name"
                            name="name"
                            value={ name }
                            onChange={ handleInputChange }
                            id="name"
                        ></input>
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            className={`form-control ${ !emailIsValid && 'is-invalid' }`}
                            placeholder="E-mail"
                            name="email"
                            value={ email }
                            onChange={ handleInputChange }
                            id="email"
                        ></input>
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className={`form-control ${ !passwordIsValid && 'is-invalid' }`}
                            placeholder="Password"
                            name="password"
                            value={ password }
                            onChange={ handleInputChange }
                            id="password"
                        ></input>
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className={`form-control ${ !confirmPasswordIsValid && 'is-invalid' }`}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={ confirmPassword }
                            onChange={ handleInputChange }
                            id="confirmPassword"
                        ></input>
                    </div>

                    <p style={{ fontSize: '11px' }}>By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy.
                        You may receive SMS notifications from us and can opt out at any time.</p>

                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <button onClick={ signUp } type="submit" className="btn btn-success btn-md mt-2 mb-1 pl-5 pr-5">Sign Up</button>
                    </div>

                </form>
                
            </Modal>
        </div>
    )
}
