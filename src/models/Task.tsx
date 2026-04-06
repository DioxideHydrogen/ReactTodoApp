interface Task {
		id: number;
		title: string;
		description?: string;
		completed: boolean;
		completedAt: Date | null;
}

export default Task;