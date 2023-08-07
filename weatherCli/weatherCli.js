import chalk from "chalk";
import axios from 'axios'

const API_KEY = "bf3169621df25d8a0a19e99f395dcb83";

//  formatea la data para presentarla en consola
function formatData(data) {
  const table = [
    {Data: 'Description', Result: data.weather[0].description },
    {Data: 'Temp', Result: `${data?.main?.temp ?? 'NO DATA'} °C`},
    {Data: 'Humidity', Result: `${data?.main?.humidity ?? 'NO DATA'} %`},
    {Data: 'Speed Wind', Result: `${data?.wind?.speed ?? 'NO DATA'} %`}
  ]
  console.log(chalk.blueBright(data.name));
  console.table(table);
}


//  trae la data usando axios
async function consultarClima(city) {
  try {
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const res = await axios.get(endpoint, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric"
      }
    })
    return res.data

  } catch (error) {
    console.log(chalk.red(`Nose pudo obtener el clima de: ${city}`));
    throw new Error(error)
  }
}

//  función inicial que recibe el país para traer la data y formatearlo
function traerDatos()  {
  let ciudad = process.argv[2]

  if (!ciudad) {
    console.log(
      chalk.red("Ingrese el nombre de una ciudad\n"),
      chalk.red("Formato válido: pnpm run clima [ciudad] o node weatherCli/weatherCli.js [ciudad]")
    );
  }

  //Trae la data del país o ciudad
  consultarClima(ciudad)
    .then(data => formatData(data))
    .catch(err => {
      console.log(`Error: ${err}`)
      process.exit(1)
    })
}
//Iniciar el proceso
traerDatos()

/*process.argv =>  retorna un array con los siguientes datos: 
**[
**  ubicación del demonio de node
**  método usado
**  param one => parámetro pasado el linea de comandos
**  param two => parámetro pasado el linea de comandos
**  param three => parámetro pasado el linea de comandos
**]
*/
