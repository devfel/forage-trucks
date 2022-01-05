import React from 'react';
import { Link } from 'react-router-dom'
import logoImg from "../../assets/images/logo.png";
import landingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import pickupIcon from "../../assets/images/icons/pickup.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import './styles.css';

function Landing() {
    return (
        <div id="page-landing">
            <div id="page-landing-content" className='container'>
                <div id="logo-container">
                    <img src={logoImg} alt="Ifas Logo" />
                    <h2>Our plataform to reserve cars & trucks</h2>
                </div>

                <img src={landingImg} className="hero-image" alt="cars and trucks" />

                <div className='buttons-container'>
                    <Link to="/reserve" className='reserve-car'>
                        <img src={pickupIcon} alt="Reserve Truck Button" /> Reserve Truck
                    </Link>

                    <Link to="/reservation-list" className='list-reservations'>
                        <img src={studyIcon} alt="List Reservations Button" /> List Reservations
                    </Link>
                </div>

                <span className='total-reservations'>
                    Total of 20.000 reservations done.
                    <img src={purpleHeartIcon} alt="reservations done purple heart" />
                </span>
            </div>
        </div>

    )
}

export default Landing;