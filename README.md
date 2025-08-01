# ScheduleWise

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![npm version](https://img.shields.io/npm/v/@kyo-services/schedulewise.svg)](https://www.npmjs.com/package/@kyo-services/schedulewise)
[![Node Version](https://img.shields.io/node/v/@kyo-services/schedulewise)](https://nodejs.org/)
[![Browser Support](https://img.shields.io/badge/browser-Chrome%20%7C%20Firefox%20%7C%20Safari%20%7C%20Edge-lightgrey)](https://browsersl.ist)

A smart and efficient task scheduler for managing periodic jobs with precision timing and intelligent scheduling in both browser and Node.js environments. Built with modern TypeScript features and following best practices for reliable task scheduling.

## 🚀 Features

- **Singleton Pattern**: Ensures single scheduler instance across your application
- **Type-Safe**: Full TypeScript support with type definitions
- **Flexible Scheduling**: Custom intervals and immediate execution options
- **Task Management**: Enable, disable, or remove tasks on demand
- **Execution History**: Track task execution count and timestamps
- **Zero Dependencies**: No external runtime dependencies
- **Well Tested**: Comprehensive test coverage

## 📦 Installation

You can install ScheduleWise using your preferred package manager:

Using npm:
```bash
npm install @kyo-services/schedulewise
```

Using yarn:
```bash
yarn add @kyo-services/schedulewise
```

Using pnpm:
```bash
pnpm add @kyo-services/schedulewise
```

## 🔧 Usage

### Basic Task Scheduling

```typescript
import sw from '@kyo-services/schedulewise';

// Create a periodic task
const task = sw.scheduleTask(
  (currentTime: Date, executionCount: number) => {
    console.log(`Task executed at ${currentTime}, count: ${executionCount}`);
  },
  {
    interval: 1000, // Run every second
    name: 'logTask', // Optional task identifier
    immediate: true // Run immediately when created
  }
);
```

### One-Time Task

```typescript
sw.scheduleTask(
  () => {
    console.log('This task runs only once after 5 seconds');
  },
  {
    interval: 5000,
    once: true
  }
);
```

### Task Management

```typescript
// Find task by name or ID
const task = sw.findTask('logTask');

// Disable task
task?.disable();

// Enable task
task?.enable();

// Update task configuration
task?.update({
  interval: 2000,
  immediate: false
});

// Remove specific task
task?.remove();
// or
sw.removeTask('logTask');

// Remove all tasks
sw.clearAllTasks();
```

## 📚 API Reference

### TaskOptions

```typescript
interface TaskOptions {
  interval: number;    // Interval in milliseconds
  name?: string;      // Optional task identifier
  immediate?: boolean; // Run immediately when created
  once?: boolean;     // Run only once
}
```

### Task Methods

| Method | Description |
|--------|-------------|
| `disable()` | Temporarily disables the task |
| `enable()` | Re-enables a disabled task |
| `update(options)` | Updates task configuration |
| `remove()` | Removes the task from scheduler |

### Task Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `number` | Unique task identifier |
| `name` | `string \| undefined` | Optional task name |
| `lastExecutionTime` | `Date` | Last execution timestamp |
| `executionCount` | `number` | Number of executions |
| `isEnabled` | `boolean` | Current enabled status |

### Scheduler Methods

| Method | Description |
|--------|-------------|
| `scheduleTask(callback, options)` | Creates a new task |
| `findTask(identifier)` | Finds task by ID or name |
| `removeTask(identifier)` | Removes a specific task |
| `clearAllTasks()` | Removes all tasks |
| `getAllTasks()` | Gets all scheduled tasks |
| `pause()` | Pauses all task executions |
| `resume()` | Resumes all task executions |
| `isPaused()` | Checks if scheduler is paused |
| `once(callback, options)` | Creates a one-time task with simplified API |

### Scheduler Control

```typescript
// Pause all task executions
sw.pause();

// Check if scheduler is paused
console.log('Scheduler paused:', sw.isPaused()); // true

// Resume all task executions
sw.resume();
```

### One-Time Task (Simplified API)

```typescript
// Using the simplified 'once' method
sw.once(
  () => {
    console.log('This is a one-time task');
  },
  {
    interval: 5000, // Execute after 5 seconds
    name: 'simpleOneTimeTask' // Optional name
  }
);
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚡ Best Practices

1. **Task Naming**: Use descriptive names for better task management
```typescript
sw.scheduleTask(sendEmail, { name: 'dailyNewsletterTask' });
```

2. **Error Handling**: Always handle task errors
```typescript
sw.scheduleTask(async () => {
  try {
    await riskyOperation();
  } catch (error) {
    console.error('Task failed:', error);
  }
}, { interval: 1000 });
```

3. **Resource Cleanup**: Remove tasks when no longer needed
```typescript
// In component unmount or cleanup
task.remove();
// or for all tasks
sw.clearAllTasks();
```

4. **Interval Selection**: Choose appropriate intervals
```typescript
// Good: Clear intention
const MINUTE = 60 * 1000;
sw.scheduleTask(task, { interval: 5 * MINUTE });

// Avoid: Magic numbers
sw.scheduleTask(task, { interval: 300000 });
```

5. **Type Safety**: Leverage TypeScript types
```typescript
import type { TaskCallback, TaskOptions } from '@kyo-services/schedulewise';

const callback: TaskCallback = (time: Date, count: number) => {
  // Type-safe callback
};
```