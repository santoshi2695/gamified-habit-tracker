import cron from 'node-cron';
import { Habit, type InterfaceHabit } from '../models/habit.model';

// cron job to run on the midnight of every day at midnight to reset daily habits
cron.schedule('0 0 * * *', () => {
  (async () => {
    const habits = await Habit.find({ resetCounterType: 1 });
    habits.forEach((hab: InterfaceHabit) => {
      if (hab.type === 1) {
        hab.positiveCounter = 0;
      } else {
        hab.negativeCounter = 0;
      }
    });
  })().catch((err: unknown) => {
    console.log('Error in running daily habit cronjob', err);
  });
});

// cron job to run on the first day of every month at midnight to reset monthly habits
cron.schedule('0 0 1 * *', () => {
  (async () => {
    const habits = await Habit.find({ resetCounterType: 2 });
    habits.forEach((hab) => {
      if (hab.type === 1) {
        hab.positiveCounter = 0;
      } else {
        hab.negativeCounter = 0;
      }
    });
  })().catch((err: unknown) => {
    console.log('Error in running monthly habit cronjob', err);
  });
});

// cron job to run on January 1st at midnight to reset yearly habits
cron.schedule('0 0 1 1 *', () => {
  (async () => {
    const habits = await Habit.find({ resetCounterType: 3 });
    habits.forEach((hab) => {
      if (hab.type === 1) {
        hab.positiveCounter = 0;
      } else {
        hab.negativeCounter = 0;
      }
    });
  })().catch((err: unknown) => {
    console.log('Error in running monthly habit cronjob', err);
  });
});
