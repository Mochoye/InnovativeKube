import { errorHandler } from '../utils/error.js';

export const calories = async (req, res, next) => {
  try {
    const { initialWeight, desiredWeight, daysToAchieve, gender, age, height } = req.body;
    res.status(200).json(req.body);
  } catch (err) {
    next(err);
  }
};
