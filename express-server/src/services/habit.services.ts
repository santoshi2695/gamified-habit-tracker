import { User } from '../models/user.model';
import { Habit } from '../models/habit.model';
import { ApiError } from '../utilities/ApiError';
import type { CreateHabitInput, UpdateHabitInput } from '../types';

export const createHabit = async (habit: CreateHabitInput) => {
  const createdHabit = await Habit.create({
    ...habit,
    positiveCounter: habit?.positiveCounter ?? 0,
    negativeCounter: habit?.negativeCounter ?? 0,
  });

  const userOfHabit = await User.findById(habit.user);
  if (!userOfHabit) {
    throw new ApiError(404, 'Habit user not found');
  }
  const newUserHabits = [...userOfHabit.habits, createdHabit._id];
  userOfHabit.habits = newUserHabits;
  await userOfHabit.save();

  return createdHabit;
};

export const deleteHabit = async (habitId: string) => {
  const deletedHabit = await Habit.findByIdAndDelete(habitId, {});
  if (!deletedHabit) {
    throw new ApiError(404, 'Habit not found');
  }
  const userOfHabit = await User.findById(deletedHabit.user.toString());
  if (!userOfHabit) {
    throw new ApiError(404, 'Habit user not found');
  }
  userOfHabit.habits = userOfHabit.habits.filter((hab) => {
    return hab._id.toString() !== habitId;
  });
  await userOfHabit.save();

  return deletedHabit;
};

export const updateHabit = async (habitId: string, habit: UpdateHabitInput) => {
  const habitToUpdate = await Habit.findById(habitId);
  if (!habitToUpdate) {
    throw new ApiError(404, 'Habit not found');
  }
  habitToUpdate.title = habit.title;
  habitToUpdate.resetCounterType = habit.resetCounterType;
  habitToUpdate.type = habit.type;
  habitToUpdate.difficulty = habit.difficulty;
  await habitToUpdate.save();
  return habitToUpdate;
};
