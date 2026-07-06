import { icons } from './assets/icons';
import toast from './scripts/toast';
import status_bar from './scripts/status_bar';

import { TaskComponent } from './scripts/components/TaskComponent';
import { TaskList } from './scripts/components/TaskList';
import { TaskManager } from './scripts/managers/TaskManager';
import * as renderer from './scripts/renderer'

type ComponentKind = 'task' | 'list';
type FormSubmitHandler = (title: string, description: string) => void;

const manager = new TaskManager('TaskKeeper');

let taskContainer: HTMLElement | null = null;
let appIcon: HTMLElement | null = null;
let taskDialog: HTMLDialogElement | null = null;
let taskForm: HTMLFormElement | null = null;
let taskFormTitle: HTMLElement | null = null;
let taskTitleInput: HTMLInputElement | null = null;
let taskDescriptionInput: HTMLTextAreaElement | null = null;
let taskFormCancel: HTMLButtonElement | null = null;
let taskFormSubmit: HTMLButtonElement | null = null;
let pendingSubmit: FormSubmitHandler | null = null;

const renderActions: renderer.TaskRenderActions = {
    onAddTask: (parent) => openCreateDialog('task', parent),
    onAddList: (parent) => openCreateDialog('list', parent),
    onEdit: (component) => openEditDialog(component),
    onDelete: (component, parent) => deleteComponent(component, parent),
};

function statusBarSetDefault() {
    status_bar.reset();
    status_bar.addBlock('new-task', 'create', 'new task', () => openCreateDialog('task', manager.rootFolder));
    status_bar.addBlock('new-list', 'create', 'new list', () => openCreateDialog('list', manager.rootFolder));
    status_bar.addBlock('task-count', 'items', manager.rootFolder.getChildren().length.toString());
}

document.addEventListener("DOMContentLoaded", function () {
    taskContainer = document.getElementById('task-container');
    appIcon = document.getElementById('app-icon');
    taskDialog = document.getElementById('task-dialog') as HTMLDialogElement | null;
    taskForm = document.getElementById('task-form') as HTMLFormElement | null;
    taskFormTitle = document.getElementById('task-form-title');
    taskTitleInput = document.getElementById('task-title-input') as HTMLInputElement | null;
    taskDescriptionInput = document.getElementById('task-description-input') as HTMLTextAreaElement | null;
    taskFormCancel = document.getElementById('task-form-cancel') as HTMLButtonElement | null;
    taskFormSubmit = document.getElementById('task-form-submit') as HTMLButtonElement | null;

    if (appIcon) appIcon.innerHTML = icons.happy;
    statusBarSetDefault();
    taskForm?.addEventListener('submit', handleTaskFormSubmit);
    taskFormCancel?.addEventListener('click', () => taskDialog?.close());
    taskDialog?.addEventListener('close', () => {
        pendingSubmit = null;
        taskForm?.reset();
    });

    renderTasks();
    toast.display("Loaded!", undefined, 'happy');
});

function renderTasks(): void {
    if (!taskContainer) return;

    taskContainer.replaceChildren();

    const children = manager.rootFolder.getChildren();
    if (children.length === 0) {
        const emptyState = document.createElement('p');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No tasks yet.';
        taskContainer.appendChild(emptyState);
    }

    for (const child of children) {
        taskContainer.appendChild(renderer.createTask(child, renderActions, manager.rootFolder));
    }

    status_bar.updateBlock('task-count', children.length.toString());
}

function openCreateDialog(kind: ComponentKind, parent: TaskList): void {
    const label = kind === 'task' ? 'task' : 'list';

    openTaskDialog(`New ${label}`, `Create ${label}`, '', '', (title, description) => {
        if (kind === 'task') {
            manager.createTask(title, description, parent);
        } else {
            manager.createFolder(title, description, parent);
        }

        renderTasks();
        toast.display(`Created ${label}`, 2000, 'happy', true);
    });
}

function openEditDialog(component: TaskComponent): void {
    openTaskDialog('Edit task', 'Save changes', component.title, component.description, (title, description) => {
        manager.updateComponent(component, title, description);
        renderTasks();
        toast.display('Saved changes', 2000, 'happy', true);
    });
}

function deleteComponent(component: TaskComponent, parent: TaskList): void {
    const shouldDelete = window.confirm(`Delete "${component.title}"?`);
    if (!shouldDelete) return;

    manager.removeComponent(component, parent);
    renderTasks();
    toast.display('Deleted', 2000, 'dead', true);
}

function openTaskDialog(
    title: string,
    submitLabel: string,
    initialTitle: string,
    initialDescription: string,
    onSubmit: FormSubmitHandler,
): void {
    if (
        !taskDialog ||
        !taskFormTitle ||
        !taskTitleInput ||
        !taskDescriptionInput ||
        !taskFormSubmit ||
        typeof taskDialog.showModal !== 'function'
    ) {
        openPromptFallback(initialTitle, initialDescription, onSubmit);
        return;
    }

    taskFormTitle.textContent = title;
    taskFormSubmit.textContent = submitLabel;
    taskTitleInput.value = initialTitle;
    taskDescriptionInput.value = initialDescription;
    pendingSubmit = onSubmit;

    taskDialog.showModal();
    taskTitleInput.focus();
    taskTitleInput.select();
}

function openPromptFallback(
    initialTitle: string,
    initialDescription: string,
    onSubmit: FormSubmitHandler,
): void {
    const title = window.prompt('Title', initialTitle)?.trim();
    if (!title) return;

    const description = window.prompt('Description', initialDescription)?.trim() ?? '';
    onSubmit(title, description);
}

function handleTaskFormSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (!pendingSubmit || !taskTitleInput || !taskDescriptionInput) return;

    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();

    if (!title) {
        toast.display('Title required', 2500, 'dead', true);
        taskTitleInput.focus();
        return;
    }

    pendingSubmit(title, description);
    pendingSubmit = null;
    taskDialog?.close();
}
