import express from 'express';
import {
  handleGetUserFromHankoId,
  handleUserRegistration,
  handleUserUpdate,
  handleHabitCompletion,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/', handleUserRegistration);
router.get('/:hankoId', handleGetUserFromHankoId);
router.put('/:hankoId', handleUserUpdate);
router.put('/habit/:habitId', handleHabitCompletion);

export default router;
