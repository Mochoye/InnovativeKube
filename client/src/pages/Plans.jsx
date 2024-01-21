import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import photo from '../assets/diet2.jpg'

// import './styles/tailwind.css'; // Import Tailwind CSS styles

export default function Plans() {
  const [initialWeight, setInitialWeight] = useState(0);
  const [desiredWeight, setDesiredWeight] = useState(0);
  const [daysToAchieve, setDaysToAchieve] = useState(0);
  const [height, setHeight] = useState(0);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [activityLevel,setActivityLevel]=useState(1.5)
  const [age, setAge] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body={
      "age": age,
      "weight(kg)": initialWeight, 
      "height(m)": height,
      "gender_F": female,
      "gender_M": male,
      "activity_level": activityLevel,
      "initial_weight": initialWeight,
      "desired_weight": desiredWeight,
      "time_interval_days": daysToAchieve
    }
    console.log('body->',body);
    const res = await fetch("http://127.0.0.1:5000/predict_calories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body:JSON.stringify({
        "age": age,
        "weight(kg)": initialWeight, 
        "height(m)": height,
        "gender_F": male,
        "gender_M": female,
        "activity_level": activityLevel,
        "initial_weight": initialWeight,
        "desired_weight": desiredWeight,
        "time_interval_days": daysToAchieve
      })
    });
    const data = await res.json();
    console.log(data);
  };

  if (!currentUser) {
    return <div>Please Login.</div>;
  }

  return (
    <div className="flex h-screen w-screen">
  <div className="flex-1">
  <div className="max-w-md mx-auto bg-white rounded p-8 mt-20 shadow-md">
      <h1 className="text-2xl font-bold mb-4">Weight Goal Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mb-4">
          Initial Weight:
          <input
            type="number"
            value={initialWeight}
            onChange={(e) => setInitialWeight(parseInt(e.target.value))}
            required
            className="border p-2 rounded mt-2"
          />
        </label>

        <label className="mb-4">
          Desired Weight:
          <input
            type="number"
            value={desiredWeight}
            onChange={(e) => setDesiredWeight(parseInt(e.target.value))}
            required
            className="border p-2 rounded mt-2"
          />
        </label>

        <label className="mb-4">
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            required
            className="border p-2 rounded mt-2"
          />
        </label>

        <label className="mb-4">
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            required
            className="border p-2 rounded mt-2"
          />
        </label>

        <label className="mb-4">
  Gender:
  <select
    value={male === 1 ? 'male' : 'female'}  
    onChange={(e) => {
      if (e.target.value === 'male') {
        setMale(1);
        setFemale(0);
      } else {
        setMale(0);
        setFemale(1);
      }
    }}
    required
    className="border p-2 rounded mt-2"
  >
    <option value="" disabled>Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</label>

        <label className="mb-4">
          Activity level:
          <input
            type="number"
            value={activityLevel}
            onChange={(e) => setActivityLevel(parseInt(e.target.value))}
            required
            className="border p-2 rounded mt-2"
            placeholder='max is 2 average is 1.5'
          />
        </label>

        <label className="mb-4">
          Days to Achieve Goal:
          <input
            type="number"
            value={daysToAchieve}
            onChange={(e) => setDaysToAchieve(parseInt(e.target.value))}
            required
            className="border p-2 rounded mt-2"
          />
        </label>

        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>
    </div>
  </div>
  <div className="flex-1"  style={{ backgroundImage: `url(${photo})`, backgroundSize: 'cover' }}> </div>

  </div>

    
  );
}
