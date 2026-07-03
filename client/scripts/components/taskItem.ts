import { TaskComponent } from "./TaskComponent";
import { TaskState } from "../states/TaskState";
import { NotStartedState } from "../states/NotStartedState";

export class TaskItem implements TaskComponent {
  public title: string;
  public description: string;
  public dueDate: Date;
  private id: number;

  private state: TaskState;

  constructor(title: string, description: string, id: number, dueDate?: Date) {
    this.title = title;

    this.description = description;

    if (dueDate) {
      this.dueDate = dueDate;
    } else {
      this.dueDate = new Date();
    }

    this.id = id;

    this.state = new NotStartedState();
  }

  public getID(): number {
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
  public archiveTask(): void {
    this.state.archiveTask(this);
  }
  public blockTask(): void {
    this.state.blockTask(this);
  }
  public display(indentation: string = ""): void {
    console.log(
      `[Task: ${this.title}] - Status: ${this.state.constructor.name}`,
    );
  }

  public addComponent(component: TaskComponent): void {
    throw new Error("Cannot add components to a taskItem (leaf node)");
  }

  public removeComponent(component: TaskComponent): void {
    throw new Error("Cannot remove components to a taskItem (leaf node)");
  }
}
