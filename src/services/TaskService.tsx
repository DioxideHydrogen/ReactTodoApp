import Task from '../models/Task';

class TaskService {

	private tasks: Task[] = [];

	public constructor() {
		let localStorageTasks = localStorage.getItem('tasks');
		if (localStorageTasks) {
			this.tasks = JSON.parse(localStorageTasks);
		}
	}

	public saveTasks(): void {
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
	}

	public addTask(title: string): Task {
		const newTask: Task = {
			id: this.tasks.length + 1,
			title,
			completed: false,
			completedAt: null
		};
		this.tasks.push(newTask);
		this.saveTasks();
		return newTask;
	}

	public getTasks(): Task[] {
		return this.tasks;
	}

	public completeTask(id: number): Task | null {
		const task = this.tasks.find(t => t.id === id);
		if (task) {
			task.completed = true;
			task.completedAt = new Date();
			this.saveTasks();
			return task;
		}
		return null;
	}

	public deleteTask(id: number): boolean {
		const index = this.tasks.findIndex(t => t.id === id);
		if (index !== -1) {
			this.tasks.splice(index, 1);
			this.saveTasks();
			return true;
		}
		return false;
	}

  public toggleTaskCompletion(id: number): Task | null {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date() : null;
      this.saveTasks();
      return task;
    }
    return null;
  }
}

export default TaskService;