import { TaskComponent } from "./TaskComponent";
import { TaskState } from "../states/TaskState";
import { NotStartedState } from "../states/NotStartedState";

export class TaskItem implements TaskComponent {
  public title: string;
  public description: string;

  private id: number;

  private state: TaskState;

  constructor(title: string, description: string, id: number) {
    this.title = title;

    this.description = description;

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

  public completeTask(): void {
    this.state.completeTask(this);
  }

  public display(): void {
    console.log(
      `[Task: ${this.title}] - Status: ${this.state.constructor.name}`,
    );
  }

  public addComponent(): void {
    throw new Error("Cannot add components to a taskItem (leaf node)");
  }

  public removeComponent(): void {
    throw new Error("Cannot remove components to a taskItem (leaf node)");
  }
}
