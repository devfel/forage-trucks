import React from "react";
import { Link } from "react-router-dom";
import backIcon from "../../assets/images/icons/back.svg"
import logoImg from "../../assets/images/logo.png"

import "./styles.css"

interface PageHedaerProps {
    title: string;
}

const PageHeader: React.FC<PageHedaerProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Back" />
                </Link>
                <img src={logoImg} alt="ifas-trucks-logo" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {props.children}
            </div>

        </header>
    );
}

export default PageHeader;