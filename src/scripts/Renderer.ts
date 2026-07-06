import { icons } from '../assets/icons';
import { TaskComponent } from './components/TaskComponent'

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

export function createMainElement(node: TaskComponent): HTMLElement {
    const root = document.createElement('div');
    root.className = 'main-task';
    root.dataset.task_id = node.getID().toString();

    const title_actions = document.createElement('div');
    title_actions.className = 'title-actions';

    const icon_list = [icons.task_empty, icons.task_check, icons.task_cross, icons.task_add];
    const icon_svg = icon_list[Math.floor(Math.random() * icon_list.length)];

    const icon = document.createElement('div');
    icon.className = 'task-icon';
    icon.innerHTML = icon_svg;

    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = node.title;

    title_actions.appendChild(icon);
    title_actions.appendChild(title);
    renderActions(title_actions);

    const children = document.createElement('div');
    children.dataset.child_container = '';

    root.appendChild(title_actions);

    if (node.description) {
        const desc = document.createElement('p');
        desc.className = 'desc';
        desc.textContent = node.description;
        root.appendChild(desc);
    }

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

    const icon_list = [icons.task_empty, icons.task_check, icons.task_cross, icons.task_add];
    const icon_svg = icon_list[Math.floor(Math.random() * icon_list.length)];

    const icon = document.createElement('div');
    icon.className = 'task-icon';
    icon.innerHTML = icon_svg;

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

    if (node.description) {
        const desc = document.createElement('p');
        desc.className = 'desc';
        desc.textContent = node.description;
        info.appendChild(desc);
    }

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
