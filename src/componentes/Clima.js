import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Clima extends Component {

    mostrarResultado = () => {
        //obtener los datos de la consulta
        const {name, weather, main} = this.props.resultado; //haciendo destructuring

        if (!name || !weather || !main) return null; //para que desaparezca cualquier error del app

        const tempKelvin = 273.15; //los resultados del API proveen la temperatura en grados Kelvin y se necesita esto para convertir a grados Celsius
        const urlIcono = `http://openweathermap.org/img/w/${weather[0].icon}.png`; //para que según el tipo de clima despliegue un ícono de la librería de OpenWeather
        const alt = `clima de ${name}`;

        return (
            <div className = "row">
                <div className = "resultado col s12 m8 l6 offset-m2 offset-l3">
                    <div className = "card-panel light-blue align-center">
                        <span className = "white-text">
                            <h2>Temperatura de: {name}</h2>
                            <p className = "temperatura">
                                Actual: {(main.temp - tempKelvin).toFixed(1)} &deg;C
                                <img src={urlIcono} alt={alt}/>
                            </p>
                            <p>Máxima: {(main.temp_max - tempKelvin).toFixed(1)} &deg;C</p>
                            <p>Mínima: {(main.temp_min - tempKelvin).toFixed(1)} &deg;C</p>
                        </span>

                    </div>
                </div>
            </div>
        );
    }

    render() { 
        return (  
            <div className = "container">
                {this.mostrarResultado()}
            </div>
        );
    }
}

//documentando con PropTypes
Clima.propTypes = {
    resultado: PropTypes.object.isRequired
}
 
export default Clima;