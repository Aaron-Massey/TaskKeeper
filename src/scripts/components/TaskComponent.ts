import { TaskState } from "../states/TaskState";

export interface TaskComponent {
  title: string;
  description: string;

  getID(): number;
  display(indentation?: string): void;

  setState(state: TaskState): void;
  getState(): TaskState;
  completeTask(): void;

  addComponent(component: TaskComponent): void;
  removeComponent(component: TaskComponent): void;
}
