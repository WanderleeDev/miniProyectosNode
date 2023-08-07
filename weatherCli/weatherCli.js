import chalk from "chalk";
import axios from 'axios'

const API_KEY = "bf3169621df25d8a0a19e99f395dcb83";

async function consultarClima(city) {
  try {
    
  } catch (error) {
    console.log(chalk.red(`Nose pudo obtener el clima de: ${city}`));
    throw new Error(error)
  }
}

function traerDatos()  {
  let ciudad = process.argv[2]

  if (!ciudad) {
    console.log(
      chalk.red("Ingrese el nombre de una ciudad\n"),
      chalk.red("Formato válido: pnpm run clima [ciudad] o node weatherCli/weatherCli.js [ciudad]")
    );
  }
  console.log(ciudad);
}

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
