import { TaskScheduler } from "../TaskScheduler";

let scheduler: TaskScheduler;
let OriginalDate: DateConstructor;

export const mockDate = (date: Date): void => {
	OriginalDate = global.Date;
	const MockDate = class extends OriginalDate {
		constructor(...args: ConstructorParameters<typeof Date>) {
			super(...args);
			return date;
		}
		static now(): number {
			return date.getTime();
		}
	} as unknown as DateConstructor;
	global.Date = MockDate;
	jest.useFakeTimers();
};

export const restoreDate = (): void => {
	jest.useRealTimers();
	global.Date = OriginalDate;
};

export const setupTest = (): TaskScheduler => {
	const now = new Date();
	mockDate(now);
	scheduler = TaskScheduler.getInstance();
	return scheduler;
};

export const cleanupTest = (): void => {
	restoreDate();
	if (scheduler) {
		scheduler.clearAllTasks();
	}
};
