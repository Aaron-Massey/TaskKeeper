import { TaskComponent } from "./TaskComponent";
import { TaskState } from "../states/TaskState";
import { NotStartedState } from "../states/NotStartedState";

export class TaskItem implements TaskComponent {
    public title: string;
    public description: string;

    private id: string;

    private state: TaskState;

    constructor(title: string, description: string, id: string, _dueDate?: Date) {
        this.title = title;

        this.description = description;

        this.id = id;

        this.state = new NotStartedState();
    }

    public getID() {
        return this.id;
    }

    public setState(newState: TaskState): void {
        this.state = newState;
    }

    public getState(): TaskState {
        return this.state;
    }

    public startTask(): void {
        this.state.startTask(this);
    }
    public completeTask(): void {
        this.state.completeTask(this);
    }

    public display(_indentation: string = ""): void {
        console.log(
            `[Task: ${this.title}] - Status: ${this.state.constructor.name}`,
        );
    }

    public getChildren(): TaskComponent[] {
        return [];
    }

    public addComponent(_component: TaskComponent): void {
        throw new Error("Cannot add components to a taskItem (leaf node)");
    }

    public removeComponent(_component: TaskComponent): void {
        throw new Error("Cannot remove components to a taskItem (leaf node)");
    }
}
