import { errorHandler } from "../utils/error.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Vitals from "../models/vitals.model.js";

export const generateExercise = async (req, res, next) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GENAI);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const id = req.params.id;
    const vitals = await Vitals.find({ userRef: req.params.id });
    const { height, age, weight, gender, activity_level } = vitals;
    const { body_part, level } = req.body;
    const prompt = `You are a Fitness trainer, who is proficient with all the excersies which can be done with and without equipments. On the basis of the following vitals given to you suggest excersise which are with and without equipments.
        User's fitness level will be categorized on the basis of how frequently he/she does workout and the category will be on Never, Occasionally and regular.
        
        1. Calorie Intake Per Day - 4000 calories
        2. Height of the user - ${height} feet.
        3. Weight of the user - ${weight} kg.
        4. Medical Issues - Diabetic
        5. How Often Do you Workout - Regular
        6. Which part of the body you want to train - ${body_part} 
        7.level of training-${level}
        8.Age of user-${age}
        9.Gender of user -${gender}
        ----
        ----
        Finally Suggest exercise which can be done with and without equipments. Provide a brief description of the excersise and how it can be done with an youtube link of that excersise if found. 
        Give the output in Json Format give 5 outputs of exercises and each exercise should have only these sections:name,description,steps,youtube video link,equipments needed,and hardness level`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const generateMealPlan=async(req,res,next)=>{
    try
    {
        const genAI = new GoogleGenerativeAI(process.env.GENAI);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const id = req.params.id;
        const vitals = await Vitals.find({ userRef: id });
        const { height, age, weight, gender, activity_level } = vitals;
        const {Breakfast,Mid_Morning_Snack,Lunch,Evening_Snack,Dinner}=req.body
        const prompt=`You are an expert in diet recommendation where you need to take the following mentioned vitals of the user and recommend diet on the basis of that to the user.

        1. Calorie Intake Per Day - 4000 calories
        2. Height of the user - ${height} feet.
        3. Weight of the user - ${weight} kg.
        4. Medical Issues - diabetic
        4. Breakfast preference - ${Breakfast}.
        5. Lunch Preference - ${Lunch}.
        6. Evening Snacks - ${Evening_Snack}.
        7. Dinner - ${Dinner}
        8.Age of user-${age}
        9.Gender of user -${gender}
        
        ----
        ----
        Finally you can also mention which food should be taken at which time period and mention the calories it contain. Give the diet chart in such a way that it has variety of combination that totals the calories to 4000 calories.
        Give the recommendation in Json format mention the food that will satisfy his daily calorie intake and will also be similar to his provided food preferances.`
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.status(200).json(response);

    }
    catch(err)
    {
        next(err)
    }
}
