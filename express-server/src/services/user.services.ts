import { User } from '../models/user.model';
import { Habit } from '../models/habit.model';
import { ApiError } from '../utilities/ApiError';
import type { UserRegistrationInput, UpdateUserInput } from '../types';

export const registerUser = async (user: UserRegistrationInput) => {
  const newRegisterUser = await User.create(user);
  await newRegisterUser.save();
  return newRegisterUser;
};

export const getUserFromHankoId = async (hankoId: string) => {
  const user = await User.findOne({ hankoId }).populate('habits');
  return user;
};

export const updateUserFromHankoId = async (
  hankoId: string,
  user: UpdateUserInput
) => {
  const updatedUser = await User.findOneAndUpdate(
    { hankoId },
    {
      $set: {
        name: user.name,
        avatar: user.avatar,
      },
    },
    {
      new: true,
    }
  ).populate('habits');

  return updatedUser;
};

export const updateUserWithHabit = async (habitId: string) => {
  const habit = await Habit.findById(habitId);
  if (!habit) {
    throw new ApiError(404, 'Habit not found');
  }
  const user = await User.findById(habit.user).populate('habits');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (habit.type === 1) {
    const prevCounter = habit.positiveCounter;
    habit.positiveCounter = prevCounter + 1;
    user.points += 5 * habit.difficulty;

    if (user.points >= 100) {
      user.level += 1;
      user.points -= 100;
      user.health = 100;
    }
  } else {
    const prevCounter = habit.negativeCounter;
    habit.negativeCounter = prevCounter - 1;

    if (user.health >= 4) {
      user.health -= 4;
    }
  }

  await habit.save();
  await user.save();

  const updatedUser = await User.findById(habit.user).populate('habits');
  return updatedUser;
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const userWithSameEmail = await User.findOne({ email });
  return !!userWithSameEmail;
};
