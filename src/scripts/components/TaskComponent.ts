import { TaskState } from '../states/TaskState';

export interface TaskComponent {
  title: string;
  description: string;
  parent?: TaskComponent | null;

  display(indentation?: string): void;

  getID(): string;
  getChildren(): TaskComponent[];

  setParent(parent: TaskComponent | null): void;
  getParent(): TaskComponent | null;

  getState(): TaskState;

  addComponent(component: TaskComponent): void;
  removeComponent(component: TaskComponent): void;
}
