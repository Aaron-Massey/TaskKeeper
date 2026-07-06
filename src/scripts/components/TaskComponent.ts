import { TaskState } from "../states/TaskState";

export interface TaskComponent {
  title: string;
  description: string;

  getID(): number;

  getState(): TaskState;
  setState(newState: TaskState): void;
  startTask(): void;
  completeTask(): void;

  display(indentation?: string): void;

  addComponent(component: TaskComponent): void;
  removeComponent(component: TaskComponent): void;
}