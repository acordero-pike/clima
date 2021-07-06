
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
let ciudades1 = []
select = document.getElementById("ciudad");
 const vl =  document.querySelector('#pais');
  

 
 vl.addEventListener('change', () => {
  if(document.querySelector('#pais').value!=null)
  {
    ciudades1.forEach(e => {
      select.remove(e);
     })
 ciudades1 =["Córdoba","Rosario","Mar del Plata","San Miguel de Tucumán","Salta","Santa Fe","Corrientes","Bahía Blanca", "Resistencia", "Posadas", "Merlo ","Quilmes","San Salvador de Jujuy","Guaymallén","Santiago del Estero","Gregorio de Laferrere","José C. Paz","Paraná","Banfield","González Catán","Neuquén","Formosa","Lanús","La Plata","Godoy Cruz","Isidro Casanova","Las Heras","Berazategui","La Rioja","Comodoro Rivadavia","Moreno","San Luis","San Miguel","San Fernando del Valle de Catamarca","Río Cuarto","Virrey del Pino"]
  
      
   select.disabled=false;
   console.log(document.querySelector('#pais').value)
   if(document.querySelector('#pais').value=="AR"){
     ciudades1.forEach(element => {
       option = document.createElement("option");
       option.value=element;
       option.text=element;
       select.appendChild(option);
    });
   
    }else if(document.querySelector('#pais').value=="PE"){
      ciudades1.forEach(e => {
        select.remove(e);
       })

      ciudades1 =["Cañete","Paita","Puerto Maldonado","Yurimaguas","Chulucanas","Andahuaylas","Pisco","Abancay","Moyobamba","Catacaos","Moquegua","Lambayeque","Huaura","Huanchaco","Barranca","Cerro de Pasco","Ilo","San Miguel","Majes","Sicuani","Chancay","Huancavelica","Tingo María","Bagua Grande"];
      ciudades1.forEach(element => {
        option = document.createElement("option");
        option.value=element;
        option.text=element;
        select.appendChild(option);
     });

      }
   
      else if(document.querySelector('#pais').value=="CR"){
        ciudades1.forEach(e => {
          select.remove(e);
         })
  
        ciudades1 =["San José","Alajuela","Desamparados","San Carlos","Cartago","Pérez Zeledón","Pococí","Heredia","Puntarenas","Goicoechea","La Unión","Limón","San Ramón","Alajuelita","Turrialba","Grecia","Curridabat","Tibás","Liberia","Vázquez de Coronado",
      ];
        ciudades1.forEach(element => {
          option = document.createElement("option");
          option.value=element;
          option.text=element;
          select.appendChild(option);
       });
  
        }

      
      else if(document.querySelector('#pais').value=="CO"){
        ciudades1.forEach(e => {
          select.remove(e);
         })
  
        ciudades1 =["Bogotá","Cundinamarca","Medellín","Cali","Barranquilla","Cartagena","Cúcuta","Soacha","Soledad","Bucaramanga","Bello","Villavicencio","Ibagué","Santa Marta","Valledupar","Montería","Pereira","Manizales","Pasto","Neiva","Palmira","Popayán","Buenaventura","Floridablanca","Armenia","Sincelejo","Itagüí","Tumaco","Envigado","Dosquebradas","Tuluá"];
        ciudades1.forEach(element => {
          option = document.createElement("option");
          option.value=element;
          option.text=element;
          select.appendChild(option);
       });
  
        }
    }
  
  else{

    

   console.log("sa"+document.querySelector('#pais').value)
   select.disabled=true;
  }
  
 })


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
    
})




function buscarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    console.log(ciudad);
    console.log(pais);

    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios')

        return;
    }
    consultarAPI(ciudad, pais );
}

function mostrarError(mensaje) {
  const alerta = document.querySelector('.bg-red-100');
  if(!alerta) {
      const alerta = document.createElement('div');

      alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center" );

      alerta.innerHTML = `
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">${mensaje}</span>
      `;

      container.appendChild(alerta);
      setTimeout(() => {
          alerta.remove();
      }, 3000);
  }
}

function consultarAPI(ciudad, pais ) {
        // Consultar la API e imprimir el Resultado...

    // leer la url  y agregar el API key
    const appId = '31b33df22fe2b492d9b74843003438fe';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner();

    // query con fetch api
    fetch(url)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        console.log(datos);
        limpiarHTML();
        if(datos.cod === "404") {
          mostrarError('Ciudad No Encontrada')
        } else {
          mostrarClima(datos)
        }
      })
      .catch(error => {
        console.log(error)
      });
}

function mostrarClima(datos) {

  // Formatear el Clima...

  const { name, main: { temp, temp_max, temp_min } } = datos;
  const {   weather } = datos;
 
  

  const grados = KelvinACentigrados(temp);
  const min = KelvinACentigrados(temp_max);
  const max = KelvinACentigrados(temp_min);

  const nombreCiudad = document.createElement('p');
  nombreCiudad.innerHTML = `Clima en: ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl')

  const actual = document.createElement('p');
  actual.innerHTML = `${grados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl')

  const tempMaxima = document.createElement('p');
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add('text-xl')


  const tempMinima = document.createElement('p');
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add('text-xl')

  const cl = document.createElement('p');
  const img = document.createElement('p');
  weather.forEach(element => {
    
    cl.innerHTML = `Clima: ${element.main}  <br>   Description: ${element.description}<br>  `;
    
if(element.main=="Clear")
{
  img.innerHTML=    `<img style="  height:50px; padding-left:13em; " src="https://acegif.com/wp-content/gifs/sun-69.gif" > `

}else{
  img.innerHTML=    `<img style="  height:50px; padding-left:13em; " src="https://i1.wp.com/www.inameh.gob.ve/web/imagenes/icons/anidia2/5.gif" > `

}
  });



  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white')
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);
  resultadoDiv.appendChild(cl);
  resultadoDiv.appendChild(img);

  resultado.appendChild(resultadoDiv)
}

function KelvinACentigrados(grados) {
  return parseInt( grados - 273.15);
}

function limpiarHTML() {
  while(resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {

  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;
  resultado.appendChild(divSpinner);
}


 



