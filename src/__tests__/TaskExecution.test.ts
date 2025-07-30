import { setupTest, cleanupTest } from "./testUtils";
import { TaskScheduler } from "../TaskScheduler";

describe("Task Execution", () => {
	let scheduler: TaskScheduler;

	beforeEach(() => {
		scheduler = setupTest();
	});

	afterEach(() => {
		cleanupTest();
	});

	it("should execute task at regular intervals", () => {
		const callback = jest.fn();
		scheduler.scheduleTask(callback, { interval: 1000 });

		// İlk çalıştırma
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(1);

		// İkinci çalıştırma
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(2);

		// Üçüncü çalıştırma
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(3);
	});

	it("should execute task only once when configured", () => {
		const callback = jest.fn();
		scheduler.scheduleTask(callback, {
			interval: 1000,
			once: true,
		});

		// İlk çalıştırma
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(1);

		// İkinci çalıştırma - çağrılmamalı
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(1);

		// Üçüncü çalıştırma - çağrılmamalı
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("should not execute disabled tasks", () => {
		const callback = jest.fn();
		const task = scheduler.scheduleTask(callback, { interval: 1000 });
		task.disable();

		// İlk çalıştırma
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(0);

		// İkinci çalıştırma
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(0);

		// Üçüncü çalıştırma
		scheduler.processTasksNow();
		expect(callback).toHaveBeenCalledTimes(0);
	});
});
