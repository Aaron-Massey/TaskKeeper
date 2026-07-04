import { icons } from '../assets/icons';
import { TaskComponent } from './components/TaskComponent'

export function createTask(task: TaskComponent): HTMLElement {
  const root = document.createElement('div');
  root.className = 'task';

  const icon_list = [icons.task_empty, icons.task_check, icons.task_cross, icons.task_add];
  const icon_svg = icon_list[Math.floor(Math.random() * icon_list.length)];

  const icon = document.createElement('div');
  icon.className = 'icon';
  icon.innerHTML = icon_svg;

  const info = document.createElement('div');
  info.className = 'info';

  root.appendChild(icon);
  root.appendChild(info);

  const title_actions = document.createElement('div');
  title_actions.className = 'title-actions';

  const title = document.createElement('p');
  title.className = 'title';
  title.textContent = task.title;

  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.innerHTML = `
    <button>${icons.add}</button>
    <button>${icons.edit}</button>
    <button>${icons.trash}</button>
  `

  title_actions.appendChild(title);
  title_actions.appendChild(actions);
  info.appendChild(title_actions);

  if (task.description) {
    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = task.description;
    info.appendChild(desc);
  }


  return root;
}
