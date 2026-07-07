import { icons } from "../assets/icons";
import { TaskComponent } from "./components/TaskComponent";
import { TaskList } from "./components/TaskList";
import { CompletedState } from "./states/CompletedState";

export interface TaskRenderActions {
  onComplete?: (component: TaskComponent) => void;
  onAddTask?: (parent: TaskList) => void;
  onAddList?: (parent: TaskList) => void;
  onEdit?: (component: TaskComponent) => void;
  onDelete?: (component: TaskComponent, parent: TaskList) => void;
}

function iconFor(data: TaskComponent): string {
  const stateName = data.getState().constructor.name;

  if (stateName === "CompletedState") return icons.task_check;
  if (stateName === "InProgressState") return icons.task_add;

  return icons.task_empty;
}

function createActionButton(
  label: string,
  iconSvg: string,
  onClick: () => void,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.title = label;
  button.setAttribute("aria-label", label);
  button.innerHTML = iconSvg;
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    onClick();
  });
  return button;
}

export function createTask(
  data: TaskComponent,
  actions: TaskRenderActions = {},
  parent?: TaskList,
): HTMLElement {
  const root = document.createElement("div");
  root.className = "task-margin";
  root.dataset.componentId = data.getID().toString();
  root.classList.add(data instanceof TaskList ? "task-list" : "task-item");

  const task = document.createElement("div");
  task.className = "task";
  task.tabIndex = 0;
  root.appendChild(task);

  const icon = document.createElement("div");
  icon.className = "icon";
  icon.innerHTML = iconFor(data);

  const info = document.createElement("div");
  info.className = "info";

  task.appendChild(icon);
  task.appendChild(info);

  const title_actions = document.createElement("div");
  title_actions.className = "title-actions";

  const title = document.createElement("p");
  title.className = "title";
  title.textContent = data.title;

  const actionBar = document.createElement("div");
  actionBar.className = "actions";

  const action_icon =
    data.getState() instanceof CompletedState
      ? icons.task_empty
      : icons.task_check;
  actionBar.appendChild(
    createActionButton("Toggle Completed", action_icon, () =>
      actions.onComplete?.(data),
    ),
  );

  if (data instanceof TaskList) {
    actionBar.appendChild(
      createActionButton("Add task", icons.add_task, () =>
        actions.onAddTask?.(data),
      ),
    );
    actionBar.appendChild(
      createActionButton("Add list", icons.add_list, () =>
        actions.onAddList?.(data),
      ),
    );
  }

  actionBar.appendChild(
    createActionButton("Edit", icons.edit, () => actions.onEdit?.(data)),
  );

  if (parent) {
    actionBar.appendChild(
      createActionButton("Delete", icons.trash, () =>
        actions.onDelete?.(data, parent),
      ),
    );
  }

  title_actions.appendChild(title);
  title_actions.appendChild(actionBar);
  info.appendChild(title_actions);

  if (data.description) {
    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = data.description;
    info.appendChild(desc);
  }

  if (data instanceof TaskList) {
    for (const child of data.getChildren()) {
      info.appendChild(createTask(child, actions, data));
    }
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
    if (newDescription && descElement) {
      descElement.textContent = newDescription;
    } else if (newDescription) {
      descElement = document.createElement("p");
      descElement.className = "desc";
      descElement.textContent = newDescription;
      infoContainer.appendChild(descElement);
    } else {
      descElement?.remove();
    }
  }
}
