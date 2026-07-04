export interface TaskComponent {
  title: string;
  description: string;
  dueDate: Date;

  display(indentation?: string): void;

  addComponent(component: TaskComponent): void;
  removeComponent(component: TaskComponent): void;
}
