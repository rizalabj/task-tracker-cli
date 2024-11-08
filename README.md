# CLI Task Tracker
https://roadmap.sh/projects/task-tracker
A simple command-line task tracker built with Node.js, no external libraries required.

## Features

- Add, update, delete, and mark tasks with statuses (`todo`, `in-progress`, `done`).
- Track creation (`createdAt`) and update (`updatedAt`) timestamps for each task.
- Filter tasks by status.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cli-task-tracker.git
   ```
2. Navigate into the project directory:
   ```bash
    cd cli-task-tracker
    ```
3. (Optional) Link the script to use task-cli globally:
    ```bash
    npm link
    ```

## USAGE
Use the following commands to manage your tasks.

1. Adding new task : 
    ```bash
    task-cli add "Buy groceries"
    ```
2. Updating a Task
    ```bash
    task-cli update 1 "Buy groceries and cook dinner"
    ```
3. Deleting a Task
    ```bash
    task-cli delete 1
    ```
4. Marking a Task as In Progress or Done
    ```bash
    task-cli mark-in-progress 1
    task-cli mark-done 1
    ```
5. Listing All Tasks
    ```bash
    task-cli list
    ```
6. Listing Tasks by Status
    ```bash
    task-cli list done
    task-cli list todo
    task-cli list in-progress
    ```

## License

This project is licensed under the MIT License.

    
`https://github.com/rizalabj/task-tracker-cli`

    