import { icons } from './assets/icons';
import toast from './scripts/toast';
import status_bar from './scripts/status_bar';

import { TaskManager } from './scripts/managers/TaskManager';
import * as Renderer from './scripts/Renderer';
import { TaskComponent } from './scripts/components/TaskComponent';
import { TaskList } from './scripts/components/TaskList';
import { TaskItem } from './scripts/components/TaskItem';

// Elements

export const manager = new TaskManager('MainView');
const task_container = document.getElementById('task-container');
const app_icon = document.getElementById('app-icon');

// Actions

function handleAdd(node: TaskComponent): void {
  if (node instanceof TaskItem) node = manager.convertToComposite(node);
  if (!(node instanceof TaskList)) return;

  manager.createTask('New Task', '', node);
  if (task_container) Renderer.render(manager.rootFolder, task_container);
  toast.display(`Added child to ${node.getID()}`);
}

task_container?.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null;
  const button = target?.closest('[data-action]') as HTMLElement | null;
  if (!button) return;

  const action = button.dataset.action;
  if (!action) return;

  const task_element = button.closest('[data-task_id]') as HTMLElement | null;
  const task_id = task_element?.dataset.task_id;
  if (!task_id) return;

  const node = manager.findByID(task_id);
  if (!node) return;

  switch (action) {
    case 'add':
      handleAdd(node);
      break;
    case 'edit':
      toast.display(`edit ${task_id}`);
      break;
    case 'delete':
      toast.display(`delete ${task_id}`);
      break;
    case 'state':
      toast.display(`state ${task_id}`);
      break;
  }
});

// Setup

function statusBarSetDefault() {
  status_bar.reset();
  // status_bar.addBlock('', 'repo', `<a href="https://github.com/Aaron-Massey/TaskKeeper/">Github</a>`)
  status_bar.addBlock('', 'create', 'new task', () => {
    addRandomTask();
  });
  status_bar.addBlock('', 'create', 'new list', () => {});
}

document.addEventListener('DOMContentLoaded', function () {
  statusBarSetDefault();
  toast.display('Loaded!', undefined, 'happy');

  if (app_icon) app_icon.innerHTML = icons.happy;
  if (task_container) Renderer.render(manager.rootFolder, task_container);
});

// Task testing

const titles = ['Milk', 'Cheese', 'Cookies', 'Eggs', 'Beef', 'Bread', 'Soap', 'Fruit'];
const descs = [
  "It's at the store",
  "That way the noise is. Tyrant! Show thy face. If thou be'eth slain and with no stroke of mine, my wife and children's ghosts will haunt me still. I cannot strike at wretched kerns whose arms are hired to bear theirs taves. Either thou, Macbeth, else my sword with an unbattr'ed edge I sheath again undeeded. There thou should be. By this great clatter, one of greatest note seems bruited. Let me find him, fortune, and more, I beg not.",
];

function addRandomTask() {
  const title = titles[Math.floor(Math.random() * titles.length)];
  const desc = descs[Math.floor(Math.random() * descs.length)];
  const hasDesc = Math.random() < 0.5;
  // const numChildren = Math.floor(Math.random() * 3) + 1;
  // const hasChild = Math.random() < 0.25;

  manager.createTask(title, hasDesc ? desc : '');
  if (task_container) Renderer.render(manager.rootFolder, task_container);
}
