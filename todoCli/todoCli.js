import { displayMenu, escogerOption } from './functions/interfaceCli.js';
import { loadTasks } from './functions/serverFunctions.js';

loadTasks()
displayMenu()
escogerOption()
