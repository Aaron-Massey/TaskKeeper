import { TaskComponent } from "./TaskComponent";
import { TaskState } from "../states/TaskState";

export class TaskList implements TaskComponent {
    public title: string;
    public description: string;
    public parent?: TaskComponent | null;

    private id: string;
    private state: TaskState;

    private children: TaskComponent[] = [];

    constructor(
        title: string,
        description: string,
        id: string,
        state: TaskState,
    ) {
        this.title = title;
        this.description = description;

        this.id = id;
        this.state = state;
        this.parent = null;
    }

    public setParent(parent: TaskComponent | null): void {
        this.parent = parent;
    }

    public getParent(): TaskComponent | null {
        return this.parent ?? null;
    }

    public getChildren(): TaskComponent[] {
        return this.children;
    }

    public addComponent(component: TaskComponent): void {
        this.children.push(component);
        try {
            component.setParent(this);
        } catch (e) {
            (component as any).parent = this;
        }
    }

    public removeComponent(component: TaskComponent): void {
        var index = this.children.indexOf(component);
        if (index == -1) {
            console.error(`Task component does not exist: ${component && (component as any).title}`);
            return;
        }
        this.children.splice(index, 1);
        try {
            component.setParent(null);
        } catch (e) {
            (component as any).parent = null;
        }
    }

    public display(indentation: string = ""): void {
        for (const child of this.children) {
            child.display(indentation + " ");
        }
    }

    public getID() {
        return this.id;
    }

    public getState() {
        return this.state;
    }
}

export function convertToTaskList(component: TaskComponent): TaskList {
    if (component instanceof TaskList) return component;

    const obj: any = component as any;
    Object.setPrototypeOf(obj, TaskList.prototype);

    if (!Array.isArray(obj.children)) obj.children = [];
    if (!('parent' in obj)) obj.parent = null;

    return obj as TaskList;
}
