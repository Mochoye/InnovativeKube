import React from 'react';
import cover from '../assets/Home.jpg';
import home from '../assets/tape.jpg'
import fly from '../assets/fly.jpg'
import MovingText from '../components/MovingText';
import {Link} from 'react-router-dom'


export default function Home() {
  return (
    <div>
      <div className="flex ">
        <div className="w-full bg-cover" style={{ backgroundImage: `url(${cover})` }}>
          <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
            <div className="hero">
              <h1 className="text-white font-bold text-5xl lg:text-8xl">
                Eat
              </h1>

              <span className="text-green-500 text-7xl lg:text-9xl font-semi-bold tracking-widest">
                HEALTHY,
              </span>

              <h1 className="text-white text-6xl font-semi-bold opacity-75">
                stay
                <span className="text-green-500 font-bold text-6xl  opacity-75">
                  healthy.
                </span>
              </h1>
              <br />
              <div className='w-1/2'>
                <p className='text-slate-500'>Embark on a journey to a healthier you with our Diet Recommender App – Your personalized path to wellness. Tailored nutrition, expert guidance, and a fitter, happier you await. Unleash the power of personalized diets for a vibrant life!</p>
              </div>
              <br />
              <br />
              <div>
                <a href="#_" className="relative inline-flex items-center justify-start px-10 py-3 sm:px-40 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group">
                  <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Let's get started...</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='h-15px w-full p-7' >
        <MovingText style={{zIndex:'4'}} text="1"  />
      </div>


      <div className='h-screen w-screen flex p-10'>
 
          <div className='flex-1' style={{ backgroundImage: `url(${home})`, backgroundSize: 'cover' }}> </div>
          <div className='flex-1' >
            <h1 className='p-5 font-semi-bold sm:text-7xl'>
              Calorie intake guide:
            </h1>
              <p className='text-slate-500 p-4 font-semi-bold text-2xl'>
                This feature achieving your dream weight within a set timeframe. Simply input your weight, height, age, and desired weight, and let CaloGuide calculate a personalized daily calorie plan tailored to your goals. With science-backed algorithms, the app provides nutritional insights, tracks your progress, and offers educational resources for a holistic approach to your wellness journey
              </p>
              <br />
              <Link to='/predict'>
              <div className='flex justify-center '>
              <a href="#_" class="relative inline-flex items-center justify-center p-4 px-20  overflow-hidden font-medium text-yellow-500 transition duration-300 ease-out border-2 border-yellow-500 rounded-full shadow-md group">
  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-yellow-500 group-hover:translate-x-0 ease">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
  </span>
  <span class="absolute flex items-center justify-center w-full h-full text-yellow-500 transition-all duration-300 transform group-hover:translate-x-full ease">Try it...</span>
  <span class="relative invisible">Button Text</span>
</a>
</div>
</Link>
          </div>


      </div>

      <div className='h-15px w-full p-7' >
        <MovingText style={{zIndex:'4'}} text="2"  />
      </div>

      <div className='h-screen w-screen flex p-10'>
 
          
          <div className='flex-1' >
            <h1 className='p-5 font-semi-bold sm:text-7xl'>
              NutriMatch:
            </h1>
              <p className='text-slate-500 p-4 font-semi-bold text-2xl'>
              AI-powered nutrition companion! NutriMatch revolutionizes dietary choices by analyzing your preferred food options and recommending alternatives with similar nutrient and calorie profiles. This personalized app utilizes advanced artificial intelligence and machine learning to curate a tailored food palette, ensuring you maintain your taste preferences while adhering to your dietary goals. Say goodbye to restrictive diets and welcome a healthier lifestyle with NutriMatch – your key to balanced nutrition and delightful culinary experiences! 
              </p>
              <br />
              <Link to='/diet'>
              <div className='flex justify-center '>
              <a href="#_" class="relative inline-flex items-center justify-center p-4 px-20  overflow-hidden font-medium text-yellow-500 transition duration-300 ease-out border-2 border-yellow-500 rounded-full shadow-md group">
  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-yellow-500 group-hover:translate-x-0 ease">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
  </span>
  <span class="absolute flex items-center justify-center w-full h-full text-yellow-500 transition-all duration-300 transform group-hover:translate-x-full ease">Try it...</span>
  <span class="relative invisible">Button Text</span>
</a>
</div>
</Link>
          </div>
          <div className='flex-1' style={{ backgroundImage: `url(${fly})`, backgroundSize: 'cover' }}> </div>


      </div>
    </div>
  );
}



//<a href="https://www.freepik.com/free-photo/top-view-healthy-balanced-vegetarian-food_12952835.htm#query=diet%20background&position=5&from_view=keyword&track=ais&uuid=713338c9-6789-4869-8b99-f30b9921d94c">Image by jcomp</a> on Freepik
//Image by <a href="https://www.freepik.com/free-photo/salad-juice-with-copy-space_5268397.htm#query=diet%20background&position=18&from_view=keyword&track=ais&uuid=713338c9-6789-4869-8b99-f30b9921d94c">Freepik</a>
//<a href="https://www.freepik.com/free-photo/vitamin-salad-fresh-tomatoes-arugula-feta-cheese-peppers-dietary-menu-proper-nutrition-top-view-flat-lay_7698285.htm#from_view=detail_author">Image by timolina</a> on Freepik
//<a href="https://www.freepik.com/free-photo/vitamin-salad-fresh-tomatoes-arugula-feta-cheese-peppers-dietary-menu-proper-nutrition-top-view-flat-lay_7698285.htm#from_view=detail_author">Image by timolina</a> on Freepik
//<a href="https://www.freepik.com/free-photo/penne-pasta-with-pesto-sauce-zucchini-green-peas-basil-italian-food-top-view-flat-lay_7676329.htm#from_view=detail_author?log-in=google">Image by timolina</a> on Freepik
//Image by <a href="https://www.freepik.com/free-photo/top-view-green-smoothie-arrangement_8223895.htm#query=green%20diet&position=41&from_view=search&track=ais&uuid=712020dc-f1f2-4333-8227-066a8409ce8c">Freepik</a>