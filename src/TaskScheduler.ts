import { Task } from './Task';
import { TaskCallback, TaskOptions } from './types';

/**
 * A singleton class that manages scheduled tasks in the system
 * @class TaskScheduler
 */
export class TaskScheduler {
    private static instance: TaskScheduler;
    private currentTimestamp: Date;
    private scheduledTasks: Map<number | string, Task> = new Map();
    private schedulerInterval: ReturnType<typeof setInterval> | null = null;

    private constructor() {
        this.currentTimestamp = new Date();
        this.startTaskProcessor();
    }

    /**
     * Gets the singleton instance of TaskScheduler
     * @returns {TaskScheduler} The singleton instance
     */
    public static getInstance(): TaskScheduler {
        if (!TaskScheduler.instance) TaskScheduler.instance = new TaskScheduler();
        return TaskScheduler.instance;
    }

    /**
     * Finds a task by its identifier (id or name)
     * @param {number | string} identifier - The task's ID or name
     * @returns {Task | undefined} The found task or undefined
     */
    public findTask(identifier: number | string): Task | undefined {
        return this.scheduledTasks.get(identifier);
    }

    /**
     * Gets all scheduled tasks in the system
     * @returns {Task[]} Array of all scheduled tasks
     */
    public getAllTasks(): Task[] {
        return Array.from(this.scheduledTasks.values());
    }

    /**
     * Creates and schedules a new task
     * @param {TaskCallback} callback - Function to be executed
     * @param {TaskOptions} options - Configuration options for the task
     * @returns {Task} The created task instance
     */
    public scheduleTask(callback: TaskCallback, options: TaskOptions): Task {
        const taskId = Math.floor(Math.random() * 1000000);
        const task = new Task(
            this,
            options.name,
            taskId,
            callback,
            options.interval,
            false,
            options.once || false
        );

        this.scheduledTasks.set(taskId, task);
        if (options.name) this.scheduledTasks.set(options.name, task);

        if (options.immediate) {
            task.execute(this.currentTimestamp);
            task.lastExecutionTime = this.currentTimestamp;
        }

        return task;
    }

    /**
     * Removes a task from the scheduler
     * @param {number | string} identifier - The task's ID or name
     */
    public removeTask(identifier: number | string): void {
        const task = this.findTask(identifier);
        if (!task) return;

        this.scheduledTasks.delete(task.id);
        if (task.name) this.scheduledTasks.delete(task.name);
    }

    /**
     * Removes all tasks and stops the scheduler
     */
    public clearAllTasks(): void {
        if (this.schedulerInterval) {
            clearInterval(this.schedulerInterval);
            this.schedulerInterval = null;
        }
        this.scheduledTasks.clear();
    }

    /**
     * Updates current timestamp and processes tasks
     * @internal For testing purposes
     */
    public processTasksNow(): void {
        const previousTimestamp = this.currentTimestamp;
        this.currentTimestamp = new Date();
        
        for (const task of this.scheduledTasks.values()) {
            const elapsedTime = task.getInterval(); // Bir interval süresi geçmiş varsayalım
            const shouldRun = task.shouldExecute(elapsedTime) && 
                            task.lastExecutionTime.getTime() <= previousTimestamp.getTime();

            if (!shouldRun) continue;

            task.execute(this.currentTimestamp);
            if (task.shouldRemove()) {
                this.removeTask(task.id);
            }
        }
    }

    /**
     * Starts the task processor that executes scheduled tasks
     * @private
     */
    private startTaskProcessor(): void {
        if (this.schedulerInterval) clearInterval(this.schedulerInterval);
        
        this.schedulerInterval = setInterval(() => {
            this.processTasksNow();
        }, 100);
    }
}