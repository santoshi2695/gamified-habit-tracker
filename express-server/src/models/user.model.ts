import mongoose, { type Types } from 'mongoose';
const Schema = mongoose.Schema;

export interface InterfaceUser extends Document {
  name: string;
  hankoId: string;
  email: string;
  avatar: string;
  health: number;
  points: number;
  level: number;
  habits: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<InterfaceUser>(
  {
    name: String,
    hankoId: String,
    email: String,
    avatar: String,
    health: { type: Number, default: 100 },
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    habits: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Habit' }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<InterfaceUser>('User', UserSchema);
