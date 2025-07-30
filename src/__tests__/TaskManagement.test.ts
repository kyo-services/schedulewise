import { setupTest, cleanupTest } from "./testUtils";
import { TaskScheduler } from "../TaskScheduler";

describe("Task Management", () => {
	let scheduler: TaskScheduler;

	beforeEach(() => {
		scheduler = setupTest();
	});

	afterEach(() => {
		cleanupTest();
	});

	it("should enable and disable tasks", () => {
		const callback = jest.fn();
		const task = scheduler.scheduleTask(callback, { interval: 1000 });

		// İlk çalıştırma - aktif
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(1);

		task.disable();
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(1);

		task.enable();
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(2);
	});

	it("should remove tasks", () => {
		const callback = jest.fn();
		const task = scheduler.scheduleTask(callback, {
			interval: 1000,
			name: "testTask",
		});

		// İlk çalıştırma
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(1);

		task.remove();

		expect(scheduler.findTask(task.id)).toBeUndefined();
		expect(scheduler.findTask("testTask")).toBeUndefined();

		// Task silindiği için çağrılmamalı
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(1);

		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("should clear all tasks", () => {
		const callback1 = jest.fn();
		const callback2 = jest.fn();

		scheduler.scheduleTask(callback1, { interval: 1000 });
		scheduler.scheduleTask(callback2, { interval: 1000 });

		scheduler.clearAllTasks();

		// Tüm tasklar silindiği için çağrılmamalı
		scheduler.processTasksNow();
		expect(callback1).not.toHaveBeenCalled();

		scheduler.processTasksNow();
		expect(callback2).not.toHaveBeenCalled();

		// Task listesi boş olmalı
		expect(scheduler.getAllTasks()).toHaveLength(0);
	});
});
