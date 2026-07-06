import { icons } from '../assets/icons';
import toast from './toast'
import { TaskComponent } from './components/TaskComponent'
import { openTaskPopup } from './popup';
import { TaskItem } from './components/TaskItem';
import { TaskList } from './components/TaskList';

export function createTask(data: TaskComponent): HTMLElement {
  const isList = data instanceof TaskList;

  const root = document.createElement('div');
  root.className = 'task-margin';
  root.setAttribute("data-state", data.getState().constructor.name);

  const task = document.createElement('div');
  task.className = isList ? 'task task-list' : 'task';
  task.tabIndex = 0;
  root.appendChild(task);

  const icon = document.createElement('div');
  icon.className = 'icon';
  const stateName = data.getState().constructor.name;

if (isList) {
  icon.innerHTML = icons.add;
} else if (stateName === "CompletedState") {
  icon.innerHTML = icons.task_check;
} else if (stateName === "InProgressState") {
  icon.innerHTML = icons.task_add;
} else {
  icon.innerHTML = icons.task_empty;
}
  if (!isList) {
    icon.addEventListener("click", () => {
      const stateName = data.getState().constructor.name;

      if (stateName === "NotStartedState") {
        data.startTask();
        icon.innerHTML = icons.task_add;
        toast.display(`"${data.title}" started`);
      } else if (stateName === "InProgressState") {
        data.completeTask();
        icon.innerHTML = icons.task_check;
        toast.display(`"${data.title}" completed`);
      } else if (stateName === "CompletedState") {
        toast.display(`"${data.title}" is already completed`);
      }

      root.setAttribute("data-state", data.getState().constructor.name);
      document.dispatchEvent(new CustomEvent("tasksUpdated"));
    });
  }

  const info = document.createElement('div');
  info.className = 'info';

  task.appendChild(icon);
  task.appendChild(info);

  const title_actions = document.createElement('div');
  title_actions.className = 'title-actions';

  const title = document.createElement('p');
  title.className = 'title';
  title.textContent = isList ? `📁 ${data.title}` : data.title;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const addButton = document.createElement("button");
  addButton.innerHTML = icons.add;

  const editButton = document.createElement("button");
  editButton.innerHTML = icons.edit;

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = icons.trash;

  actions.appendChild(addButton);
  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  editButton.addEventListener("click", () => {
    openTaskPopup(
  isList ? "Edit List" : "Edit Task",
  data.title,
  data.description,
  (newTitle, newDescription) => {
    editTask(data, root, newTitle, newDescription, isList);
    document.dispatchEvent(new CustomEvent("tasksUpdated"));
  },
  isList ? "List Name" : "Task Name"
  );
  });

  deleteButton.addEventListener("click", () => {
    const confirmDelete = confirm(`Delete "${data.title}"?`);

    if (confirmDelete) {
      root.remove();
      document.dispatchEvent(new CustomEvent("tasksUpdated"));
    }
  });

  addButton.addEventListener("click", () => {
   openTaskPopup("Add Subtask", "", "", (title, description) => {
      const subtask = new TaskItem(title, description, Date.now());
      const subtaskElement = createTask(subtask);

      info.appendChild(subtaskElement);

      document.dispatchEvent(new CustomEvent("tasksUpdated"));
   }, "Subtask Name");
  });

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

export function editTask(
  data: TaskComponent,
  rootElement: HTMLElement,
  newTitle?: string,
  newDescription?: string,
  isList: boolean = false,
): void {
  const titleElement = rootElement.querySelector(
    ".title",
  ) as HTMLParagraphElement;
  const infoContainer = rootElement.querySelector(".info") as HTMLDivElement;
  let descElement = rootElement.querySelector(".desc") as HTMLParagraphElement;

  if (!titleElement) {
    console.error("Could not find the required titleElement for editing");
    return;
  }

  if (!infoContainer) {
    console.error("Could not find required infoContainer for editing");
    return;
  }

  if (newTitle !== undefined) {
    data.title = newTitle;
    titleElement.textContent = isList ? `📁 ${newTitle}` : newTitle;
  }

  if (newDescription !== undefined) {
    data.description = newDescription;

    if (newDescription.trim() === "") {
      if (descElement) {
        descElement.remove();
      }
      return;
    }

    if (descElement) {
      descElement.textContent = newDescription;
    } else {
      descElement = document.createElement("p");
      descElement.className = "desc";
      descElement.textContent = newDescription;
      infoContainer.appendChild(descElement);
    }
  }
}