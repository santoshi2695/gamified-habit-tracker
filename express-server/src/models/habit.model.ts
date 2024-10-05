import { Schema, model, type Types, type Document } from 'mongoose';

export interface InterfaceHabit extends Document {
  title: string;
  user: Types.ObjectId;
  type: number;
  difficulty: number;
  positiveCounter: number;
  negativeCounter: number;
  resetCounterType: number;
  createdAt: Date;
  updatedAt: Date;
}

const HabitSchema = new Schema<InterfaceHabit>(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: Number,
    difficulty: Number,
    positiveCounter: Number,
    negativeCounter: Number,
    resetCounterType: Number,
  },
  {
    timestamps: true,
  }
);

export const Habit = model<InterfaceHabit>('Habit', HabitSchema);
