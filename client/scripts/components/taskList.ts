import { TaskComponent } from "./TaskComponent";

export class TaskList implements TaskComponent {
  public title: string;
  public description: string;
  public dueDate: Date;

  private children: TaskComponent[] = [];

  constructor(title: string, description: string, dueDate: Date) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
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
}
