import {
  registerUser,
  checkEmailExists,
  getUserFromHankoId,
  updateUserFromHankoId,
  updateUserWithHabit,
} from '../services/user.services';
import { ApiError } from '../utilities/ApiError';
import { ApiResponse } from '../utilities/ApiResponse';
import { type Request, type Response } from 'express';
import { asyncHandler } from '../utilities/asyncHandler';
import { type InterfaceUser } from '../models/user.model';
import type { UpdateUserInput, UserRegistrationInput } from '../types';

export const handleUserRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const userData = req.body as UserRegistrationInput;
    const isEmailAlreadyRegistered = await checkEmailExists(userData.email);
    if (isEmailAlreadyRegistered) {
      throw new ApiError(409, 'Email already exists');
    }
    const newUser = await registerUser(userData);
    res
      .status(200)
      .json(
        new ApiResponse<{ user: InterfaceUser }>(
          200,
          { user: newUser },
          'User registered successfully'
        )
      );
  }
);

export const handleGetUserFromHankoId = asyncHandler(
  async (req: Request, res: Response) => {
    const hankoId = req.params.hankoId;
    const user = await getUserFromHankoId(hankoId);
    res
      .status(200)
      .json(
        new ApiResponse<{ user: InterfaceUser }>(
          200,
          { user: user as InterfaceUser },
          'User updated successfully'
        )
      );
  }
);

export const handleUserUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const userData: UpdateUserInput = req.body;
    const newUser = await updateUserFromHankoId(req.params.hankoId, userData);
    res.status(200).json(
      new ApiResponse<{ user: InterfaceUser }>(
        200,
        {
          user: newUser as InterfaceUser,
        },
        'User updated successfully'
      )
    );
  }
);

export const handleHabitCompletion = asyncHandler(
  async (req: Request, res: Response) => {
    const newUser = await updateUserWithHabit(req.params.habitId);
    res.status(200).json(
      new ApiResponse<{ user: InterfaceUser }>(
        200,
        {
          user: newUser as InterfaceUser,
        },
        'User updated successfully'
      )
    );
  }
);
