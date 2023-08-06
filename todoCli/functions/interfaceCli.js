import chalk from 'chalk'
import { createInterface } from 'readline'
import userFunctions from './userFunctions.js';

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

export function displayMenu() {
  console.log(chalk.blueBright.bold('Todo app'));
  console.log(chalk.blueBright.bold('Escoge una opción'));
  console.log('1-agregar tarea');
  console.log('2-listar tareas');
  console.log('3-completar tarea');
  console.log('4-Salir')
}

export function escogerOption() {
  //  abre la comunicación con la terminal
  rl.question('Digital el número de opción ', (option) => {
    switch (option) {
      case "1":
        userFunctions.addTask()
        break;
      case "2":
        userFunctions.listTasks()
        break;
      case "3":
        userFunctions.completedTasks()
        break;
      case "4":
        console.log(chalk.yellow('Adios'));
        //  cierra la comunicación con la terminal
        rl.close()
        break;
      default:
        console.log(chalk.red('Opción invalida, Intenta nuevamente'))
        //  Vuelve a llamar display menu
        displayMenu()
        escogerOption()
        break;
    }
  })
}
