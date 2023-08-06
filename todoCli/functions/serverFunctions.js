import { readFileSync, writeFileSync } from 'fs' // forma sincronía
import { DB_FILE } from '../DB/dbText.js';
import { tasks } from './listTasks.js';
import chalk from 'chalk';
import { log } from 'console';

export function loadTasks() {
  try {
    const data = readFileSync(DB_FILE, "utf-8")
    const lines = data.split("\n")
    tasks.length = 0;
    lines.forEach(line => {
      if (line.trim() !== "") {
        const [task, completed] = line.split("|")
        tasks.push({
          task: task, 
          completed: completed === true})
      }
    })
    console.log(chalk.green('Se ha cargado los datos desde la DB \n'))
  } catch (error) {
    console.log(chalk.green('No hay tareas en la DB \n'))
  }
}

export function saveTasks() {
  const data = tasks.map(task => `${task.task} | ${task.completed}`).join("\n")
 // forma sincrona
 //params: path => ruta de la DB
 //params: data => contenido a guarda en texto plano
 //params: codificación => utf-8 para diversos caracteres especiales
  writeFileSync(DB_FILE, data, "utf-8")
  console.log(chalk.green('Tarea agregada con éxito a la DB')); 
}
