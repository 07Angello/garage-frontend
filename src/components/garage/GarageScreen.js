import React from 'react';
import './GarageScreenStyles.css';
import { Navbar } from '../ui/Navbar'
import { HomeScreen } from './home/HomeScreen';
import { useDispatch } from 'react-redux';
import { customerOpenModal } from '../../redux/actions/customerModal';
import { CustomerModal } from './customer/customerModal/CustomerModal';

export const GarageScreen = () => {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch( customerOpenModal() );
    }

    return (
        <div>
            <Navbar />
            <HomeScreen />
        </div>
    )
}
