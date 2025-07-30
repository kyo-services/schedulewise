/**
 * Callback function type for scheduled tasks
 * @callback TaskCallback
 * @param {Date} [executionTime] - Timestamp when the task was executed
 * @param {number} [executionCount] - Number of times the task has been executed
 * @returns {void}
 */
export type TaskCallback = (executionTime?: Date, executionCount?: number) => void;

/**
 * Configuration options for creating a scheduled task
 * @typedef {Object} TaskOptions
 * @property {string} [name] - Optional name to identify the task
 * @property {number} interval - Time interval in milliseconds between executions
 * @property {boolean} [immediate] - Whether to execute the task immediately upon creation
 * @property {boolean} [once] - Whether the task should only execute once
 */
export type TaskOptions = {
    name?: string;
    interval: number;
    immediate?: boolean;
    once?: boolean;
};