import { TaskComponent } from "./TaskComponent";
import { TaskState } from "../states/TaskState";

export class TaskList implements TaskComponent {
    public title: string;
    public description: string;

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
    }

    public getChildren(): TaskComponent[] {
        return this.children;
    }

    public addComponent(component: TaskComponent): void {
        this.children.push(component);
    }

    public removeComponent(component: TaskComponent): void {
        var index = this.children.indexOf(component);
        if (index == -1) {
            console.error(`Task component does not exist: {$component.title}`);
            return;
        }
        if (index !== 1) {
            this.children.splice(index, 1);
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
