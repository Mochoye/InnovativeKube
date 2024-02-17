import React, { useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select } from '@mui/material';
import ExerciseCard from '../components/ExerciseCard';
import gym from '../assets/gym2.jpeg'

const Exercise = () => {
  const [bodyPart, setBodyPart] = useState('');
  const [level, setLevel] = useState('');
  const [exercises, setExercises] = useState([]);
  const [res,setRes]=useState(false);

  const bodyPartOptions = [
    'Abdominals', 'Adductors', 'Abductors', 'Biceps', 'Calves', 'Chest', 'Forearms',
    'Glutes', 'Hamstrings', 'Lats', 'Lower Back', 'Middle Back', 'Traps', 'Neck',
    'Quadriceps', 'Shoulders', 'Triceps'
  ];

  const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];

  const handleSubmit = async () => {
    if (!bodyPart || !level) {
      alert('Please select both body part and level.');
      return;
    }
    const res = await fetch("http://127.0.0.1:5000/get_recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "body_part": bodyPart,
        "level": level
      })
    });
    const data = await res.json();
    setExercises(data);
    setRes(true)
  };

  return (
    <div>
    <div className='flex flex-row justify-center mt-20'>
      <div className='flex-1'>
      <h1 className='flex font-bold text-6xl text-left pl-3'>Exercise Recommender:</h1>

        <p className='flex text-slate-500 text-left align-center pl-3 pt-3'>Enhance your fitness journey with our AI-powered exercise recommendation system. Tailored to your training level and target body part, our innovative tool provides personalized workout suggestions. Whether you're a beginner or a seasoned gym enthusiast, optimize your training routine with our AIML-enhanced feature.</p>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>

                <h1 className='font-semi-bold text-2xl text-left'>Muscle group you want to train:</h1>
              <Select
                value={bodyPart}
                onChange={(e) => { setBodyPart(e.target.value) }}
                placeholder="Muscle-group"
                label="Body Part"
                className=''
              >
                {bodyPartOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <h1 className='font-semi-bold text-2xl'>Your experience:</h1>
              <Select
                value={level}
                onChange={(e) => { setLevel(e.target.value) }}
                label="Level"
              >
                {levelOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className='pt-6 pl-3'>
            <a href="#_" class="relative inline-block text-lg group" onClick={handleSubmit}>
<span class="relative z-10 block px-20 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
<span class="absolute inset-0 w-full h-full px-20 py-3 rounded-lg bg-gray-50"></span>
<span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
<span class="relative">Recommend exercises</span>
</span>
<span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
</a>
</div>
          </Box>
        </Box>
      </div>
      <div className='flex-1'  style={{ backgroundImage: `url(${gym})`, backgroundSize: "cover" ,height:"85vh"}}></div>
    </div>

                <div className=''>
            <div>{res && <h1 className='flex font-bold text-5xl justify-center pl-3 mt-10'>Exercise recommendations:</h1>}</div>
            <br />
            <div className='flex flex-row flex-wrap gap-4'>
              {exercises.map((exercise, index) => (
                <ExerciseCard key={index} exercise={exercise} />
              ))}</div>
</div>
         
            </div>
  );
}

export default Exercise;



   
