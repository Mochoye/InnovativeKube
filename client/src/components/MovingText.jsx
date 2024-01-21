import React from 'react';
import './MovingText.css';

export default function MovingText({text}) {

  if(text==='2')
  return (
    <div className="moving-text-container">
      <div className="moving-text">
        <h1 className='font-bold text-yellow-500 text-large text-6xl'>NutriMatcher NutriMatcher: NutriMatcher: NutriMatcher: NutriMatcher: NutriMatcher: NutriMatcher:</h1>
        </div>
    </div>
  );
  if(text==='1')
  return (
    <div className="moving-text-container">
      <div className="moving-text">
        <h1 className='font-bold text-yellow-500 text-large text-6xl'>OUR OFFERRINGS: OUR OFFERRINGS: OUR OFFERRINGS: OUR OFFERRINGS: OUR OFFERRINGS: OUR OFFERRINGS: OUR OFFERRINGS: OUR OFFERRINGS: OUR OFFERRINGS: OUR OFFERRINGS:</h1>
        </div>
    </div>
  );
}