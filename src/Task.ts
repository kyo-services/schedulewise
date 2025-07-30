import { TaskCallback } from './types';
import { TaskScheduler } from './TaskScheduler';

/**
 * Represents a scheduled task in the system
 * @class Task
 */
export class Task {
    private scheduler: TaskScheduler;
    public lastExecutionTime: Date;
    public executionCount: number;
    public isEnabled: boolean;

    /**
     * Creates a new Task instance
     * @param {TaskScheduler} scheduler - Reference to the scheduler instance
     * @param {string} [name] - Optional name to identify the task
     * @param {number} id - Unique identifier for the task
     * @param {TaskCallback} callback - Function to be executed
     * @param {number} interval - Time interval in milliseconds between executions
     * @param {boolean} executeImmediately - Whether to execute immediately
     * @param {boolean} isOneTime - Whether to execute only once
     */
    constructor(
        scheduler: TaskScheduler,
        public readonly name: string | undefined,
        public readonly id: number,
        private callback: TaskCallback,
        private interval: number,
        private executeImmediately: boolean,
        private isOneTime: boolean
    ) {
        this.scheduler = scheduler;
        this.executionCount = 0;
        this.isEnabled = true;
        this.lastExecutionTime = new Date(0);
    }

    /**
     * Executes the task callback
     * @param {Date} currentTime - Current timestamp
     */
    public execute(currentTime: Date): void {
        this.callback(currentTime, this.executionCount + 1);
        this.lastExecutionTime = currentTime;
        this.executionCount++;
    }

    /**
     * Enables the task
     * @returns {Task} The task instance for chaining
     */
    public enable(): Task {
        this.isEnabled = true;
        return this;
    }

    /**
     * Disables the task
     * @returns {Task} The task instance for chaining
     */
    public disable(): Task {
        this.isEnabled = false;
        return this;
    }

    /**
     * Updates the task configuration
     * @param {TaskOptions} options - New configuration options
     * @param {TaskCallback} [newCallback] - Optional new callback function
     * @returns {Task} The task instance for chaining
     */
    public update(options: { interval: number, immediate?: boolean }, newCallback?: TaskCallback): Task {
        this.interval = options.interval;
        this.executeImmediately = options.immediate || false;
        if (newCallback) this.callback = newCallback;
        return this;
    }

    /**
     * Removes the task from the scheduler
     */
    public remove(): void {
        this.scheduler.removeTask(this.id);
    }

    /**
     * Gets the task's interval
     * @returns {number} The interval in milliseconds
     */
    public getInterval(): number {
        return this.interval;
    }

    /**
     * Checks if the task is ready to execute
     * @param {number} elapsedTime - Time elapsed since last execution
     * @returns {boolean} Whether the task should execute
     */
    public shouldExecute(elapsedTime: number): boolean {
        return elapsedTime >= this.interval && this.isEnabled;
    }

    /**
     * Checks if the task should be removed after execution
     * @returns {boolean} Whether the task is one-time
     */
    public shouldRemove(): boolean {
        return this.isOneTime;
    }
}