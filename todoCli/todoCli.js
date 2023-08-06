import { readFileSync, writeFileSync } from 'fs' // forma sincronía
import { createInterface } from 'readline'
import chalk from 'chalk'

const tasks =[];
const DB_FILE = "tasks.txt";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

function displayMenu() {
  console.log(chalk.blueBright.bold('Todo app'));
  console.log(chalk.blueBright.bold('Escoge una opción'));
  console.log('1-agregar tarea');
  console.log('2-listar tareas');
  console.log('3-completar tarea');
  console.log('4-Salir')
}

function loadTasks(params) {
  try {
    const data = readFileSync
  } catch (error) {
    
  }
}

function saveTasks(params) {
  
}

function addTask() {
  rl.question(chalk.bgCyanBright("Escribe la tarea: "), (task) => {
    tasks.push ({
      task,
      completed: false
    })
    console.log(chalk.green(`Tarea agregada con éxito: # ${task} \n`));
    saveTasks() //sincrono - hasta q no se resuelva no ejecutará lo siguiente
    displayMenu()
    escogerOption()
  })
}

function listTasks() {
  (!tasks.length) 
    ? console.log('Sin pendientes 🤩')
    : tasks.forEach((task, i) => {
      let status = task.completed ? '✅' : '❌';
      (status === '✅') 
        ? console.log(chalk.green(`${i + 1}. ${status} - ${task.task}`)) 
        : console.log(chalk.red(`${i + 1}. ${status} - ${task.task}`))
    });

  displayMenu()
  escogerOption()
}

function completedTasks () {
  rl.question(chalk.bgCyanBright("Ingresa el número de la tarea  completa"), (numTask) => {
    const index = parseInt(numTask) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
      saveTasks()
      console.log('tarea completada ✅');
    } else {
      console.log('tarea inexistente ❌');
    }
    displayMenu()
    escogerOption()
  })
}

function escogerOption() {
  //  bre la comunicación con la terminal
  rl.question('Digital el número de opción ', (option) => {
    switch (option) {
      case "1":
        addTask()
        break;
      case "2":
        listTasks()
        break;
      case "3":
        completedTasks()
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

loadTasks()
displayMenu()
escogerOption()
