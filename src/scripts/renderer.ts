import { icons } from '../assets/icons';
import toast from './toast'
import { TaskComponent } from './components/TaskComponent'

export function createTask(data: TaskComponent): HTMLElement {
    const root = document.createElement('div');
    root.className = 'task-margin';

    const task = document.createElement('div');
    task.className = 'task';
    task.tabIndex = 0;
    root.appendChild(task);

    const icon_list = [icons.task_empty, icons.task_check, icons.task_cross, icons.task_add];
    const icon_svg = icon_list[Math.floor(Math.random() * icon_list.length)];

    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.innerHTML = icon_svg;

    const info = document.createElement('div');
    info.className = 'info';

    task.appendChild(icon);
    task.appendChild(info);

    const title_actions = document.createElement('div');
    title_actions.className = 'title-actions';

    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = data.title;

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.innerHTML = `
    <button onClick="toast.display('Add')">${icons.add}</button>
    <button onClick="toast.display('Edit')">${icons.edit}</button>
    <button onClick="toast.display('Delete')">${icons.trash}</button>
  `

    title_actions.appendChild(title);
    title_actions.appendChild(actions);
    info.appendChild(title_actions);

    if (data.description) {
        const desc = document.createElement('p');
        desc.className = 'desc';
        desc.textContent = data.description;
        info.appendChild(desc);
    }

    return root;
}
