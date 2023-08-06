import chalk from 'chalk'
import { rl, displayMenu, escogerOption } from "./interfaceCli.js";
import { tasks } from "./listTasks.js";
import { saveTasks, loadTasks} from "./serverFunctions.js";

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

const userFunctions = {
  addTask,
  listTasks,
  completedTasks
}

export default userFunctions;
