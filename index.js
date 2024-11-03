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
    const latestTaskID = tasks[tasks.length-1].id
    const newTask = { id: latestTaskID + 1, name: taskName, status: 'todo' };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

function listTasks(status = null) {
    const tasks = loadTasks();
    const filteredTasks = status ? tasks.filter(t => t.status === status) : tasks;
    if (filteredTasks.length === 0) {
        console.log('No tasks found.');
    } else {
        filteredTasks.forEach(task => {
            console.log(`ID: ${task.id} | ${task.name} | Status: ${task.status}`);
        });
    }
}

function updateTask(id, newName) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.name = newName;
        saveTasks(tasks);
        console.log('Task updated successfully');
    } else {
        console.log('Task not found');
    }
}

// Function to delete a task
function deleteTask(id) {
    let tasks = loadTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
    if (tasks.length < initialLength) {
        console.log('Task deleted successfully');
    } else {
        console.log('Task not found');
    }
}

function markTask(id, status) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = status;
        saveTasks(tasks);
        console.log(`Task marked as ${status}`);
    } else {
        console.log('Task not found');
    }
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



