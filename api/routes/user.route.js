import express from 'express';
import {
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import {createVitals,getVitals} from '../controllers/vitals.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
import { generateExercise,generateMealPlan } from '../controllers/gemini.controller.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/vitals/:id',verifyToken,createVitals)
router.post('/ML/exercise/:id',verifyToken,generateExercise)
router.post('/ML/meal/:id',verifyToken,generateMealPlan)
router.get('/getVitals/:id',verifyToken,getVitals)

export default router;
