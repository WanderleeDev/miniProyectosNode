import { displayMenu, escogerOption } from './functions/interfaceCli.js';
import { loadTasks } from './functions/serverFunctions.js';

//  carga las tareas guardadas de la pseudo DB
loadTasks()
//  muestra el menu de opciones
displayMenu()
//  función para tratar la opción elegida
escogerOption()
