import React, { useState } from 'react';
import './authStyles.css';
import ReactTooltip from 'react-tooltip';
import { RegisterModal } from './RegisterModal';
import { useDispatch } from 'react-redux';
import { loginOpenModal } from '../../redux/actions/loginModal';
import { startLogin } from '../../redux/actions/auth';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [loginFormValues, setLoginFormValues] = useState({
        email: '',
        password: ''
    });

    const { email, password } = loginFormValues;

    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true)

    const handleInputChange = ({ target }) => {
        setLoginFormValues({
            ...loginFormValues,
            [target.name]: target.value
        });

        setEmailIsValid(true);
        setPasswordIsValid(true);
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if (email.length === 0 || !email) {
            return setEmailIsValid(false);
        }

        if (password.length === 0 || !password){
            return setPasswordIsValid(false);
        }

        setEmailIsValid(true);
        setPasswordIsValid(true);

        dispatch( startLogin(email, password) )
    }

    const goToMyLinkedIn = () => {
        window.open('https://www.linkedin.com/in/gabriel-angello-antonelly-g%C3%A1mez-b1b623195/','AngelloAntonelly');
    }

    const openRegisterModal = () => {
        dispatch( loginOpenModal() );
    }

    return (
        <div className="w-100 h-100 row d-flex justify-content-center align-items-center" style={{ position: 'absolute' }}>
            <ReactTooltip type="info" place="bottom" effect="solid" />
            <div className="row no-margin login-custom">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="reactibook-logo">Car Garage</h1>
                    <h2 style={{ fontWeight: 'lighter' }}>Recent logins</h2>
                    <h6  style={{ fontWeight: 'lighter' }}>Click your picture or add an account.</h6>
                    <div className="d-flex flex-row justify-content-around align-items-center">
                        <div className="card login-card" onClick={ goToMyLinkedIn } data-tip="Contact me!">
                            <span className="badge bg-linkedIn"><i className="bi bi-linkedin"></i></span>
                            <div className="img-card-container">
                                <img className="card-img-top img-zoom" alt="..." src="https://i.ibb.co/6DkT86n/Gabriel.jpg" />
                            </div>
                            <div className="card-body" style={{ padding: '0px' }}>
                                <h5 className="card-title custom-crd-title">Angello Gámez</h5>
                            </div>
                        </div>
                        <div className="card login-card">
                            <div className="d-flex justify-content-center align-items-center login-add-account">
                                <i className="bi bi-plus-circle-fill"></i>
                            </div>
                            <div className="card-body" style={{ padding: '0px' }}>
                                <h5 className="card-title custom-crd-title" style={{ color: '#1877f2', textAlign: 'center' }}>Add Account</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center move">
                    <form
                        className="login-form needs-validation"
                        onSubmit={ handleLogin }
                    >
                        <div className="form-group">
                            <input
                                type="email"
                                className={`form-control ${ !emailIsValid && 'is-invalid' }`}
                                placeholder="Enter email"
                                name="email"
                                value={ email }
                                onChange={ handleInputChange }
                                id="email"

                            ></input>
                            <div className="invalid-feedback">
                                The email is required, can not be empty.
                            </div>
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
                            <div className="invalid-feedback">
                                The password is required, can not be empty.
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Log In</button>
                        <p className="text-center mt-3 mb-1 text-primary">Forgotten Password?</p>

                        <hr className="separator"></hr>

                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <button onClick={ openRegisterModal } type="button" className="btn btn-success btn-lg mt-2 mb-1">Create Account</button>
                        </div>
                    </form>
                    <p><b>Create your account</b> for employees only.</p>
                </div>
            </div>

            <RegisterModal />
        </div>
    )
}
