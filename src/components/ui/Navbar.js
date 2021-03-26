import React from 'react';
import './ui-styles.css';
import garageLogo from '../../assets/carGarage.png';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';
import { useHistory } from 'react-router-dom';
import defaultProfilePhoto from '../../assets/avatar.svg';

export const Navbar = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const { profilePhoto, name } = useSelector(state => state.auth);

    const handleLogOut = () => {
        dispatch( startLogout() );
    }

    const handleWall = () => {
        history.push("/maintenances");
    }


    return (
        <div className="navbar bg mb-4 custom-navbar">

            <span className="navbar-brand" onClick={ handleWall } style={{ cursor:'pointer' }}>
                <img src={ garageLogo } alt="Reactibook" height="33" className="d-inline-block align-middle mr-2"/>
            </span>

            

            <div className="btn-group dropdown register-form-x d-flex justify-content-center align-items-center" style={{height: '100%' }}>
                <button onClick={ handleWall } type="button" className="btn btn-light d-flex justify-content-center align-items-center rounded"
                    style={{ fontWeight: 'bold', marginRight: '10px' }}>
                    <i className="bi bi-house-door-fill" style={{ fontSize: '20px' }}></i>
                </button>

                <button type="button" className="btn btn-light d-flex justify-content-center align-items-center rounded"
                    style={{ fontWeight: 'bold', marginRight: '10px' }}>
                    <img src={ profilePhoto ? profilePhoto : defaultProfilePhoto } alt="Reactibook" height="30" className="d-inline-block align-middle mr-2" style={{ borderRadius: '50px' }}/>
                    { name }
                </button>

                <button
                    className="btn btn-light d-flex justify-content-center align-items-center rounded"
                    type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                >
                    <i className="bi bi-caret-down-fill" style={{ fontSize: '20px' }}></i>
                </button>
                <div className="dropdown-menu">
                    <b onClick={ () => handleLogOut() } className="dropdown-item" style={{ fontWeight: 'bold' }}>
                        <i className="bi bi-box-arrow-right" style={{ color:'red' }}></i> Logout
                    </b>
                </div>
            </div>


        </div>
    )
}
