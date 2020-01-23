import React from 'react';
import './shop-header.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket,faRubleSign  } from '@fortawesome/free-solid-svg-icons'

const baske = <FontAwesomeIcon icon={faShoppingBasket}  className="icon"/>
const ruble = <FontAwesomeIcon icon={faRubleSign} className="icon"/>



const ShopHeader = ({ numItems, total }) => {
    return (
    <header className="shop__header">
        <nav className="shop__menu">
            <Link to="/" className="shop__link">
                ReStore
            </Link>
            <Link to="/cart" className="shop__link">
                {baske}
                {numItems} items ({total}{ruble})
            </Link>
        </nav>

    </header>
    );
};

export default ShopHeader;
