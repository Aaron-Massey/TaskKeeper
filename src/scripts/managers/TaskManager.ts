import { TaskList, convertToTaskList } from "../components/TaskList";
import { TaskItem } from "../components/TaskItem";
import { TaskComponent } from "../components/TaskComponent";
import { NotStartedState } from "../states/NotStartedState";

export class TaskManager {
    public rootFolder: TaskList;

    constructor(projectName: string) {
        this.rootFolder = new TaskList(
            projectName,
            "The root folder for all tasks",
            this.generateID(),
            new NotStartedState(),
        );
    }

    private generateID(): string {
        return crypto.randomUUID();
    }

    public createTask(
        title: string,
        description: string,
        targetFolder?: TaskList,
    ): TaskItem {
        if (!targetFolder) targetFolder = this.rootFolder;

        const newTask = new TaskItem(title, description, this.generateID());
        // @ts-ignore
        targetFolder.addComponent(newTask);

        console.log(`Task "${title}" created in folder "${targetFolder.title}".`);
        return newTask;
    }

    public createFolder(
        title: string,
        description: string,
        targetFolder: TaskList,
        id?: string,
    ): TaskList {
        const newFolder = new TaskList(
            title,
            description,
            id || this.generateID(),
            new NotStartedState(),
        );
        targetFolder.addComponent(newFolder);

        console.log(`Folder "${title}" created in folder "${targetFolder.title}".`);
        return newFolder;
    }

    public findByID(id: string): TaskComponent | null {
        function recurse(node: TaskComponent): TaskComponent | null {
            if (node.getID() === id) return node;
            for (const child of node.getChildren()) {
                const found = recurse(child);
                if (found) return found;
            }
            return null;
        }

        return recurse(this.rootFolder);
    }

    public convertToComposite(task: TaskItem): TaskList {
        const composite = convertToTaskList(task as any);

        const parentFolder = task.getParent() as TaskList | null;
        if (parentFolder) {
            composite.setParent(parentFolder);
        } else {
            console.error(`Task "${task.title}" has no parent folder. Cannot convert to composite.`);
        }

        return composite;
    }
}
