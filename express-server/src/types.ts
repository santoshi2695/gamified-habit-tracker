export interface UserRegistrationInput {
  name?: string;
  email: string;
  avatar?: string;
  hankoId: string;
}

export interface UpdateUserInput {
  name: string;
  avatar: string;
}

export interface CreateHabitInput {
  title: string;
  user: string;
  type: number;
  difficulty: number;
  positiveCounter?: number;
  negativeCounter?: number;
  resetCounterType: number;
}

export interface UpdateHabitInput {
  title: string;
  resetCounterType: number;
  type: number;
  difficulty: number;
}
