import Vitals from "../models/vitals.model.js";

export const createVitals=async(req,res,next)=>{
    try {
        const data = await Vitals.create(req.body);
        return res.status(201).json(data);
      } catch (error) {
        next(error);
      }
}
export const getVitals=async(req,res,next)=>{
  try{
      const id=req.params.id;
      const vital=await Vitals.find({ userRef: id })
      if(!vital){
        res.status(400).json({message:"please Enter your vitals first"})
      }
      else{
        res.status(200).json(vital)
      }
  }
  catch(e){
    console.log(e)
  }
}