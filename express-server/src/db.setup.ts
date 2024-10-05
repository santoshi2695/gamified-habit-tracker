import mongoose from 'mongoose';

const mongoUri =
  process.env.MONGODB_URI ?? 'mongodb://localhost:27017/momentumX';

async function connectDB() {
  try {
    const connectedInstance = await mongoose.connect(mongoUri);
    console.log(
      `MongoDB connected !! host: ${connectedInstance.connection.host}`
    );
  } catch (err) {
    console.log('MongoDB connection FAILED', err);
    process.exit(1);
  }
}

export default connectDB;
