/**
 * Task Manager - Composite Pattern Implementation
 * TaskComponent (base), Task (Leaf), TaskList (Composite)
 */

export class TaskComponent {
    constructor(title, description, dueDate) {
      if (new.target === TaskComponent) {
        throw new Error("TaskComponent is abstract and cannot be instantiated directly.");
      }
      this.title = title;
      this.description = description;
      this.dueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
    }
  
    display(indent = 0) {
      throw new Error("display() must be implemented by subclass.");
    }
  
    addComponent(component) {
      throw new Error("addComponent() is not supported on this component.");
    }
  
    removeComponent(component) {
      throw new Error("removeComponent() is not supported on this component.");
    }
  
    getChildren() {
      return [];
    }
  }
  
  export class Task extends TaskComponent {
    constructor(title, description, dueDate, status = "Not Started") {
      super(title, description, dueDate);
      const validStatuses = ["Not Started", "In Progress", "Blocked", "Completed", "Archived"];
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status: ${status}. Must be one of: ${validStatuses.join(", ")}`);
      }
      this.status = status;
    }
  
    setStatus(status) {
      const validStatuses = ["Not Started", "In Progress", "Blocked", "Completed", "Archived"];
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }
      this.status = status;
    }
  
    display(indent = 0) {
      const pad = " ".repeat(indent);
      console.log(`${pad}[Task] ${this.title}`);
      console.log(`${pad}  Status:      ${this.status}`);
      console.log(`${pad}  Description: ${this.description}`);
      console.log(`${pad}  Due:         ${this.dueDate.toDateString()}`);
    }
  
    // Serialize to plain object for JSON API responses
    toJSON() {
      return {
        type: "task",
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        status: this.status,
      };
    }
  }
  
  export class TaskList extends TaskComponent {
    constructor(title, description, dueDate) {
      super(title, description, dueDate);
      this.children = [];
    }
  
    addComponent(component) {
      if (!(component instanceof TaskComponent)) {
        throw new Error("Only TaskComponent instances can be added.");
      }
      this.children.push(component);
    }
  
    removeComponent(component) {
      const index = this.children.indexOf(component);
      if (index === -1) {
        throw new Error(`Component "${component.title}" not found in "${this.title}".`);
      }
      this.children.splice(index, 1);
    }
  
    getChildren() {
      return this.children;
    }
  
    getProgress() {
      const allTasks = this._getAllLeafTasks();
      if (allTasks.length === 0) return 0;
      const completed = allTasks.filter(t => t.status === "Completed").length;
      return Math.round((completed / allTasks.length) * 100);
    }
  
    _getAllLeafTasks() {
      let tasks = [];
      for (const child of this.children) {
        if (child instanceof Task) {
          tasks.push(child);
        } else if (child instanceof TaskList) {
          tasks = tasks.concat(child._getAllLeafTasks());
        }
      }
      return tasks;
    }
  
    display(indent = 0) {
      const pad = " ".repeat(indent);
      console.log(`${pad}[TaskList] ${this.title} (${this.getProgress()}% complete)`);
      console.log(`${pad}  Description: ${this.description}`);
      console.log(`${pad}  Due:         ${this.dueDate.toDateString()}`);
      for (const child of this.children) {
        child.display(indent + 4);
      }
    }
  
    // Serialize to plain object for JSON API responses
    toJSON() {
      return {
        type: "tasklist",
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        progress: this.getProgress(),
        children: this.children.map(c => c.toJSON()),
      };
    }
  }