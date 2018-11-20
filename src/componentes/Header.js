import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <div>
            <nav> 
                <div className = "nav-wrapper light-blue darken-2">
                    <a className = "brand-logo" href="/">{props.titulo}</a>
                </div>
            </nav>
        </div>
    ); //<nav> en vez de <header> porque la clase "brand-logo" de Materialize solamente está disponible en <nav>
};

//documentando con PropTypes
Header.propTypes = {
    titulo: PropTypes.string.isRequired
}

export default Header;