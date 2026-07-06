import { icons } from '../assets/icons';
import toast from './toast'
import { TaskComponent } from './components/TaskComponent'
import { openTaskPopup } from './popup';

export function createTask(data: TaskComponent): HTMLElement {
    const root = document.createElement('div');
    root.className = 'task-margin';

    const task = document.createElement('div');
    task.className = 'task';
    task.tabIndex = 0;
    root.appendChild(task);

    const icon_svg = icons.task_empty;
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
  openTaskPopup("Edit Task", data.title, data.description, (newTitle, newDescription) => {
    editTask(data, root, newTitle, newDescription);

    document.dispatchEvent(new CustomEvent("tasksUpdated"));
  });
});

deleteButton.addEventListener("click", () => {
  const confirmDelete = confirm(`Delete "${data.title}"?`);

  if (confirmDelete) {
    root.remove();

    document.dispatchEvent(new CustomEvent("tasksUpdated"));
  }
});

addButton.addEventListener("click", () => {
  toast.display("Add subtask/list popup can go here next");
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
    titleElement.textContent = newTitle;
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