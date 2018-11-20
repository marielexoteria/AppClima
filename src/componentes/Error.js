import React from 'react';
import PropTypes from 'prop-types';

//stateless component que se puede reutilizar para mostrar mensajes de error diferentes
const Error = (props) => {
    return (  
        <div className = "container">
            <div className = "row">
                <div className = "col s12 m6 offset-m3">
                    <div className = "card-panel red darken-4 error"> 
                        {props.mensajeError}
                    </div>
                </div>
            </div>
        </div>
    ); //className = error > custom class, el resto son del framework Materialize
}

//documentando con PropTypes
Error.propTypes = {
    mensajeError: PropTypes.string.isRequired
}
 
export default Error;