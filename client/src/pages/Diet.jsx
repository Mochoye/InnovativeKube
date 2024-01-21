import React, { useState } from 'react';
import fork from '../assets/prof.jpg'

const Diet = () => {
  const [Breakfast,setBreakfast]=useState()
  const [Mid_Morning_Snack,setMid_Morning_Snack]=useState()
  const [Lunch,setLunch]=useState()
  const [Evening_Snack,setEvening_Snack]=useState()
  const [Dinner,setDinner]=useState()




  return (
    <div className=' flex justify-between h-screen w-screen' style={{ backgroundImage: `url(${fork})`, backgroundSize: 'cover' }}> 
    <div className="  max-w-md mx-auto bg-white shadow-md p-10 mt-20">
      <h1 className="text-2xl font-semibold mb-4">Text Inputs Page</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
          Breakfast:
            <input
              type="text"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={input1}
              onChange={(e) => setBreakfast(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
          Mid_Morning_Snack:
            <input
              type="text"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={Mid_}
              onChange={(e) => setMid_Morning_Snack(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
          Lunch:
            <input
              type="text"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={Lunch}
              onChange={(e) => setLunch(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
          Evening_Snack
            <input
              type="text"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={Evening_Snack}
              onChange={(e) => setEvening_Snack(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
          Dinner
            <input
              type="text"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={Dinner}
              onChange={(e) => setDinner(e.target.value)}
            />
          </label>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Diet;
