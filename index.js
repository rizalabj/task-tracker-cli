#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');

const tasksFile = 'tasks.json';

function loadTasks() {
    try {
        const data = fs.readFileSync(tasksFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function saveTasks(tasks) {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

function addTask(taskName) {
    const tasks = loadTasks();
    const newTask = { id: tasks.length + 1, name: taskName, status: 'todo' };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Function to list all tasks
function listTasks(rl) {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.\n');
    } else {
        console.log('Tasks:');
        tasks.forEach((task, index) => {
            const status = task.completed ? '[✓]' : '[ ]';
            console.log(`${index + 1}. ${task.name} ${status}`);
        });
        console.log();
    }
    mainMenu(rl);
}

const [,, command, ...args] = process.argv;

switch (command) {
    case 'add':
        addTask(args.join(' '));
        break;
    case 'update':
        updateTask(parseInt(args[0]), args.slice(1).join(' '));
        break;
    case 'delete':
        deleteTask(parseInt(args[0]));
        break;
    case 'mark-in-progress':
        markTask(parseInt(args[0]), 'in-progress');
        break;
    case 'mark-done':
        markTask(parseInt(args[0]), 'done');
        break;
    case 'list':
        listTasks(args[0]);
        break;
    default:
        console.log('Invalid command. Available commands: add, update, delete, mark-in-progress, mark-done, list');
}



