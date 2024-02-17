import React from 'react';
import { Tilt } from 'react-tilt';

const ExerciseCard = ({ exercise }) => {
  return (
    <div >
    <Tilt options={{ scale: 1.02 }}>
      <div className=" bg-slate-200 max-w-md mx-auto shadow-md overflow-hidden rounded-lg mb-4 hover:shadow-lg transition duration-300">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{exercise.Title}</h2>
          <p className="text-lg text-gray-700 mb-4">{exercise.Desc}</p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-gray-700 font-semibold mr-1">Equipment:</span>
              <span className="text-gray-700">{exercise.Equipment}</span>
            </div>
            <div className="text-gray-700">
              <span className="font-semibold mr-1">Type:</span>
              {exercise.Type}
            </div>
          </div>
        </div>
      </div>
    </Tilt>
    </div>
  );
};

export default ExerciseCard;
