import React, { Component } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Error from './componentes/Error';
import Clima from './componentes/Clima';


class App extends Component {

  state = { //creando el state que tendrá el mensaje de error, el objeto que tendrá la info que se digite en el formulario y el objeto que tendrá la info sobre el clima
    error: "",
    consulta: {},
    resultado: {}
  }

  componentDidMount() {
    this.setState({
      error: false
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.consulta !== this.state.consulta) { //quiere decir que los datos en las 2 consultas son diferentes
      this.consultarApi();
    }
  }

  consultarApi = () => {
    const {ciudad, pais} = this.state.consulta; //haciendo destructuring de lo que el state tiene guardado
    if (!ciudad || !pais) return null; //para que no despliege "undefined" en la consola ya que al cargar la página por primera vez el state está vacío

    //leer la URL y agregar el API Key
    const appID = "1aa7657d49e0e79742d57a2e0d04ad88";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    
    //query con fetch API
    fetch(url)
      .then(respuesta => { //usando Promises
        return respuesta.json(); //para que devuelva la respuesta del query en formato JSON
      })
      .then(datos => {
        this.setState({
          resultado: datos
        })
      })
      .catch(error => { //en caso de que haya algún problema con la API
        console.log(error)
      })
  }

  //validando el formulario
  datosConsulta = respuesta => {
    if (respuesta.ciudad === "" || respuesta.pais === "" ) { //el usuario dejó uno de o los 2 campos vacíos
      this.setState({
        error: true
      })
    } else { //el usuario entró la ciudad y eligió el país
      this.setState({ 
        consulta: respuesta,
        error: false
      })
    }
  }

  render() {

    const {error} = this.state,
          {cod} = this.state.resultado; //haciendo destructuring para leer el error (cod, que es del API: 404 cuando no encuentra la ciudad o bien que el usuario no llenó alguno o todos los campos)
    let resultado; //declarando variable

    if (error) { //si el usuario no llenó los 2 campos, la variable resultado toma el valor del componente Error y se manda el mensaje a desplegar como prop
      resultado = <Error mensajeError = "Ambos campos son obligatorios" />
    } else if (cod === "404") { //si la API no encuentra la ciudad que el usuario escribió
      resultado = <Error mensajeError = "Ciudad no encontrada" />
    } else { //de lo contrario, carga el componente que muestra la info del clima
      resultado = <Clima resultado = {this.state.resultado} />
    } 

    return (
      <div className="app">
          <Header
              titulo = "App de Clima" 
          />
          <Formulario 
              datosConsulta = {this.datosConsulta}
          />
          {resultado} 
      </div>
    ); //{resultado} cargará el componente de error o de la info del clima según el state sea false (error) o true (info del clima)
  }
}

export default App;
