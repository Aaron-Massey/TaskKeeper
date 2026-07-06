import { icons } from '../assets/icons';
import { TaskComponent } from './components/TaskComponent'
import { NotStartedState } from './states/NotStartedState';
import { InProgressState } from './states/InProgressState';
import { CompletedState } from './states/CompletedState';

export function render(node: TaskComponent, container: HTMLElement): void {
  container.innerHTML = '';
  renderNode(node, container, true);
}

function renderNode(node: TaskComponent, parent: HTMLElement, isMain = false): void {
  const element = isMain ? createMainElement(node) : createNodeElement(node);
  parent.appendChild(element);

  const children = node.getChildren();
  const container = element.querySelector('[data-child_container]');

  if (children.length == 0) return
  if (container instanceof HTMLElement) {
    children.forEach(child => {
      renderNode(child, container);
    })
  } else {
    throw new Error("Can't find where to place children!");
  }
}

function createNodeElement(node: TaskComponent): HTMLElement {
  // This allows different renders for different
  // lists, default all to task renderer for now.
  return createTaskElement(node);
}

function getIconForNode(node: TaskComponent): string {
  let state: any = null;
  try {
    state = node.getState();
  } catch (e) {
    state = null;
  }
  switch (state.constructor.name) {
    case 'CompletedState':
      return icons.task_check;
    case 'InProgressState':
      return icons.task_add;
    case 'NotStartedState':
      return icons.task_empty;
    default:
      return icons.task_empty;
  }
}

export function createMainElement(node: TaskComponent): HTMLElement {
  const root = document.createElement('div');
  root.className = 'main-task';
  root.dataset.task_id = node.getID().toString();

  const title_actions = document.createElement('div');
  title_actions.className = 'title-actions';

  const icon = document.createElement('div');
  icon.className = 'task-icon';
  icon.dataset.action = 'state'
  icon.innerHTML = getIconForNode(node);

  const title = document.createElement('p');
  title.className = 'title';
  title.textContent = node.title;

  title_actions.appendChild(icon);
  title_actions.appendChild(title);
  renderActions(title_actions);

  const children = document.createElement('div');
  children.dataset.child_container = '';

  root.appendChild(title_actions);

  const desc = document.createElement('p');
  desc.className = 'desc';
  desc.textContent = node.description;
  root.appendChild(desc);

  root.appendChild(children)

  return root;
}

export function createTaskElement(node: TaskComponent): HTMLElement {
  const root = document.createElement('div');
  root.className = 'task-margin';
  root.dataset.task_id = node.getID().toString();

  const task = document.createElement('div');
  task.className = 'task';
  task.tabIndex = 0;
  root.appendChild(task);

  const icon = document.createElement('div');
  icon.className = 'task-icon';
  icon.innerHTML = getIconForNode(node);

  const info = document.createElement('div');
  info.className = 'info';
  info.dataset.child_container = '';

  task.appendChild(icon);
  task.appendChild(info);

  const title_actions = document.createElement('div');
  title_actions.className = 'title-actions';

  const title = document.createElement('p');
  title.className = 'title';
  title.textContent = node.title;

  title_actions.appendChild(title);
  renderActions(title_actions);
  info.appendChild(title_actions);

  const desc = document.createElement('p');
  desc.className = 'desc';
  desc.textContent = node.description;
  info.appendChild(desc);

  return root;
}

function renderActions(parent: HTMLElement) {
  const actions = document.createElement('div');
  actions.className = 'task-actions';
  actions.innerHTML = `
<button data-action="add">${icons.add}</button>
<button data-action="edit">${icons.edit}</button>
<button data-action="delete">${icons.trash}</button>
`;
  parent.appendChild(actions);
}
