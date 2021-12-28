import React from 'react';
import { Link } from 'react-router-dom'
import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
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
                        <img src={studyIcon} alt="Reserve Button" /> B1Res(CNstudy)
                    </Link>

                    <Link to="/reservation-list" className='list-reservations'>
                        <img src={giveClassesIcon} alt="Reserve Button" /> B2List(giveClasses)
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