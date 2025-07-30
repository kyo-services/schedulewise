import { setupTest, cleanupTest } from "./testUtils";
import { TaskScheduler } from "../TaskScheduler";

describe("Task Creation", () => {
	let scheduler: TaskScheduler;

	beforeEach(() => {
		scheduler = setupTest();
	});

	afterEach(() => {
		cleanupTest();
	});

	it("should create a task with basic configuration", () => {
		const callback = jest.fn();
		const task = scheduler.scheduleTask(callback, { interval: 1000 });

		expect(task).toBeDefined();
		expect(task.getInterval()).toBe(1000);
		expect(task.isEnabled).toBe(true);
		expect(task.executionCount).toBe(0);
	});

	it("should create a task with immediate execution", () => {
		const callback = jest.fn();
		const task = scheduler.scheduleTask(callback, {
			interval: 1000,
			immediate: true,
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(task.executionCount).toBe(1);
	});

	it("should create a task with a name", () => {
		const callback = jest.fn();
		const task = scheduler.scheduleTask(callback, {
			interval: 1000,
			name: "testTask",
		});

		expect(task.name).toBe("testTask");
		expect(scheduler.findTask("testTask")).toBe(task);
	});
});
