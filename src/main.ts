import { icons } from './assets/icons';
import toast from './scripts/toast';
import status_bar from './scripts/status_bar';

import { TaskManager } from './scripts/managers/TaskManager';
import * as Renderer from './scripts/Renderer'

// Elements

export const manager = new TaskManager("MainView");
const task_container = document.getElementById('task-container');
const app_icon = document.getElementById('app-icon');

task_container?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const button = target.closest('button');
    if (!button) return;

    // Find the task element this button belongs to
    const taskElement = button.closest('[data-task_id]') as HTMLElement;
    if (!taskElement) return;

    const taskId = taskElement.dataset.task_id;
    const action = button.dataset.action;

    switch (action) {
        case 'add':
            if (taskId) {
                const node = manager.findByID(taskId);
                if (node) {
                    let targetFolder: any = node;
                    try {
                        const children = (node as any).getChildren();
                        if (Array.isArray(children) && children.length === 0) {
                            targetFolder = manager.convertToComposite(node as any);
                        }
                    } catch (e) {
                        targetFolder = manager.convertToComposite(node as any);
                    }
                    manager.createTask('New Task', '', targetFolder instanceof Object && (targetFolder as any).getChildren ? targetFolder : undefined);
                    if (task_container) Renderer.render(manager.rootFolder, task_container);
                    toast.display(`Added child to ${taskId}`);
                }
            }
            break;
        case 'edit':
            toast.display(`edit ${taskId}`);
            break;
        case 'delete':
            toast.display(`delete ${taskId}`);
            break;
    }
});

// Setup

function statusBarSetDefault() {
    status_bar.reset();
    // status_bar.addBlock('', 'repo', `<a href="https://github.com/Aaron-Massey/TaskKeeper/">Github</a>`)
    status_bar.addBlock('', 'create', 'new task', () => { addRandomTask() });
    status_bar.addBlock('', 'create', 'new list', () => { });
}

document.addEventListener("DOMContentLoaded", function () {
    statusBarSetDefault();
    toast.display("Loaded!", undefined, 'happy')

    if (app_icon) app_icon.innerHTML = icons.happy;
    if (task_container) Renderer.render(manager.rootFolder, task_container);
});

// Task testing

const titles = ["Milk", "Cheese", "Cookies", "Eggs", "Beef", "Bread", "Soap", "Fruit"];
const descs = ["It's at the store", "That way the noise is. Tyrant! Show thy face. If thou be'eth slain and with no stroke of mine, my wife and children's ghosts will haunt me still. I cannot strike at wretched kerns whose arms are hired to bear theirs taves. Either thou, Macbeth, else my sword with an unbattr'ed edge I sheath again undeeded. There thou should be. By this great clatter, one of greatest note seems bruited. Let me find him, fortune, and more, I beg not."];

function addRandomTask() {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const desc = descs[Math.floor(Math.random() * descs.length)];
    const hasDesc = Math.random() < 0.5;
    // const numChildren = Math.floor(Math.random() * 3) + 1;
    // const hasChild = Math.random() < 0.25;

    manager.createTask(title, hasDesc ? desc : "");
    if (task_container) Renderer.render(manager.rootFolder, task_container);
}

// function makeTask(): HTMLElement {
//     const title = titles[Math.floor(Math.random() * titles.length)];
//     const desc = descs[Math.floor(Math.random() * descs.length)];
//     const hasDesc = Math.random() < 0.5;
//     const hasChild = Math.random() < 0.25;
//     const numChildren = Math.floor(Math.random() * 3) + 1;
//
//     const task = new TaskItem(title, hasDesc ? desc : "", 1);
//     const taskEl = renderer.createTaskElement(task);
//
//     if (hasChild) {
//         for (var i = 0; i < numChildren; i++) {
//             const infoEl = taskEl.querySelector('info');
//             if (infoEl instanceof HTMLElement) infoEl.appendChild(makeTask());
//         }
//     }
//     return taskEl;
// }