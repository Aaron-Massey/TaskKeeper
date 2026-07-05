import { icons } from './assets/icons';
import toast from './scripts/toast';
import status_bar from './scripts/status_bar';

import { TaskItem } from './scripts/components/TaskItem';
import * as renderer from './scripts/renderer'

// Elements

const task_container = document.getElementById('task-container');
const app_icon = document.getElementById('app-icon');

// Setup

function statusBarSetDefault() {
    status_bar.reset();
    // status_bar.addBlock('', 'repo', `<a href="https://github.com/Aaron-Massey/TaskKeeper/">Github</a>`)
    status_bar.addBlock('', 'create', 'new task', () => { task_container?.appendChild(makeTask()) });
    status_bar.addBlock('', 'create', 'new list', () => { task_container?.appendChild(makeTask()) });
}

document.addEventListener("DOMContentLoaded", function () {
    if (app_icon) app_icon.innerHTML = icons.happy;
    statusBarSetDefault();
    toast.display("Loaded!", undefined, 'happy')
});

// Task testing

const titles = ["Milk", "Cheese", "Cookies", "Eggs", "Beef", "Bread", "Soap", "Fruit"];
const descs = ["It's at the store", "That way the noise is. Tyrant! Show thy face. If thou be'eth slain and with no stroke of mine, my wife and children's ghosts will haunt me still. I cannot strike at wretched kerns whose arms are hired to bear theirs taves. Either thou, Macbeth, else my sword with an unbattr'ed edge I sheath again undeeded. There thou should be. By this great clatter, one of greatest note seems bruited. Let me find him, fortune, and more, I beg not."];

function makeTask(): HTMLElement {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const desc = descs[Math.floor(Math.random() * descs.length)];
    const hasDesc = Math.random() < 0.5;
    const numChildren = Math.floor(Math.random() * 3) + 1;
    const hasChild = Math.random() < 0.25;

    const task = new TaskItem(title, hasDesc ? desc : "", 1);
    const taskEl = renderer.createTask(task);

    if (hasChild) {
        for (var i = 0; i < numChildren; i++) {
            const infoEl = taskEl.getElementsByClassName('info')[0];
            infoEl.appendChild(makeTask());
        }
    }
    return taskEl;
}

for (let i = 0; i < 20; i++) {
    // task_container?.appendChild(makeTask());
}
