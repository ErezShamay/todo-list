import chalk from 'chalk';
import fs from 'fs';
import readline from 'readline';

// File to store tasks
const tasksFile = 'tasks.json';

// Ensure the tasks file exists
if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, JSON.stringify([])); // Initialize with an empty array
}

// Load tasks from file
const loadTasks = () => {
    const data = fs.readFileSync(tasksFile);
    return JSON.parse(data);
};

// Save tasks to file
const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};

// Show menu
const showMenu = () => {
    console.log(chalk.blue('\nTo-Do List App'));
    console.log(chalk.green('1. View Tasks'));
    console.log(chalk.green('2. Add Task'));
    console.log(chalk.green('3. Remove Task'));
    console.log(chalk.green('4. Exit\n'));
};

// Handle user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const handleUserInput = (option) => {
    const tasks = loadTasks();

    switch (option) {
        case '1': // View Tasks
            console.log(chalk.yellow('\nYour Tasks:'));
            tasks.forEach((task, index) => {
                console.log(`${index + 1}. ${task}`);
            });
            rl.question('\nPress Enter to return to the menu...', () => {
                main();
            });
            break;

        case '2': // Add Task
            rl.question(chalk.blue('\nEnter a new task: '), (newTask) => {
                tasks.push(newTask);
                saveTasks(tasks);
                console.log(chalk.green('\nTask added!'));
                main();
            });
            break;

        case '3': // Remove Task
            rl.question(chalk.blue('\nEnter the task number to remove: '), (taskNumber) => {
                const index = parseInt(taskNumber, 10) - 1;
                if (index >= 0 && index < tasks.length) {
                    tasks.splice(index, 1);
                    saveTasks(tasks);
                    console.log(chalk.red('\nTask removed!'));
                } else {
                    console.log(chalk.red('\nInvalid task number.'));
                }
                main();
            });
            break;

        case '4': // Exit
            console.log(chalk.green('\nGoodbye!'));
            rl.close();
            break;

        default:
            console.log(chalk.red('\nInvalid option. Try again.'));
            main();
            break;
    }
};

// Main loop
const main = () => {
    showMenu();
    rl.question(chalk.blue('Choose an option: '), handleUserInput);
};

// Start the app
main();