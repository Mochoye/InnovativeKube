import React, { useState } from 'react';
import fork from '../assets/prof.jpg'
import recipeData from '../components/recipes.js'
import { FixedSizeList } from 'react-window';
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import RecipeCard from '../components/RecipeCard.jsx'

const Diet = () => {
  const [Breakfast,setBreakfast]=useState()
  const [Mid_Morning_Snack,setMid_Morning_Snack]=useState()
  const [Lunch,setLunch]=useState()
  const [Evening_Snack,setEvening_Snack]=useState()
  const [Dinner,setDinner]=useState()
  const [res,setRes]=useState(false);

  const [result,setResult]=useState([]);

  const [dish,setDish]=useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [search,setSearch]=useState("");

  const [filteredRecipes,setFilteredRecipes]=useState([])


  const [type,setType]=useState(null)

  



  const recipes=recipeData.split('\n');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/generate_meal_plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body:JSON.stringify({
          "Breakfast": [Breakfast],
          "Mid_Morning_Snack": [Mid_Morning_Snack],
          "Lunch": [Lunch],
          "Evening_Snack": [Evening_Snack],
          "Dinner": [Dinner]
      })
    });
    const data = await res.json();
    console.log(data.meal_recommendations);
    setResult(data.meal_recommendations)
    setRes(true)
    console.log(result);
  };


  const handleSearch = () => {
    const lowerCaseQuery = search.toLowerCase();
    const filtered = recipes.filter(recipe => recipe.toLowerCase().includes(lowerCaseQuery));
    setFilteredRecipes(filtered);
  };

  const transferValue = () => {
    console.log(search);
    console.log(type);
  
    if (type === 1) {
      setBreakfast(search);
      console.log("inside breakfast");
    }
    if (type === 2) {
      setMid_Morning_Snack(search);
    }
    if (type === 3) {
      setLunch(search);
    }
    if (type === 4) {
      setEvening_Snack(search);
    }
    if (type === 5) {
      setDinner(search);
    }
    setOpen((cur) => !cur);
    setSearch("");
    console.log("at last");
  };
  



  return (
    <>
    <div className='bg-slate-200'>
    <div className=' flex justify-between h-screen w-screen' style={{ backgroundImage: `url(${fork})`, backgroundSize: 'cover' }}> 
    <div className=" flex-1 max-w-md w-1/2 mx-auto bg-white shadow-md p-10 mt-20">
      <h1 className="text-2xl font-semibold mb-4">Diet recommendation:</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
          Breakfast:
            <input
              type="text"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={Breakfast}
              onChange={(e) => {setBreakfast(e.target.value); setType(1);}}
              onClick={() => { handleOpen(); setType(1); }}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
          Mid_Morning_Snack:
            <input
              type="text"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:border-blue-500"
              value={Mid_Morning_Snack}
              onChange={(e) => {setMid_Morning_Snack(e.target.value);setType(2)}}
              onClick={() => { handleOpen(); setType(2); }}
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
              onChange={(e) => {setLunch(e.target.value);setType(3)}}
              onClick={() => { handleOpen(); setType(3); }}
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
              onChange={(e) => {setEvening_Snack(e.target.value);setType(4)}}
              onClick={() => { handleOpen(); setType(4); }}
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
              onChange={(e) => {setDinner(e.target.value);setType(5)}}
              onClick={() => { handleOpen(); setType(5); }}
            />
          </label>
        </div>
        <div onClick={handleSubmit}>
        <a href="#_" class="relative px-20 py-3 font-medium text-white transition duration-300 bg-green-400 rounded-md hover:bg-green-500 ease">
<span class="absolute bottom-0 left-0 h-full -ml-2">
<svg viewBox="0 0 487 487" class="w-auto h-full opacity-100 object-stretch" xmlns="http://www.w3.org/2000/svg"><path d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
</span>
<span class="absolute top-0 right-0 w-12 h-full -mr-3">
<svg viewBox="0 0 487 487" class="object-cover w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" fill="#FFF" fill-rule="nonzero" fill-opacity=".1"></path></svg>
</span>
<span class="relative">Generate meal plan</span>
</a>
        </div>
      </form>
    </div>
    
    </div>
    <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-blur mt-10"
      >
        <Card className="mx-auto w-full max-w-[35rem] p-3">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray p-3">
              Search diet!
            </Typography>
           
            <Input palceholder="search" size="lg"  onChange={()=>setSearch(e.target.value)} value={search}/>

            <div className='center'>
      <h1 className='font-bold font-6xl'>Menu:</h1>
      {filteredRecipes.length==0 && <FixedSizeList
        className='center overflow-hidden'
        height={window.innerHeight * 0.5}
        itemCount={recipes.length}
        itemSize={50}
        width={window.innerWidth * 0.4}
      >
        {({ index, style }) => (
          <div style={style} className=' items-center rounded-lg m-2 hover:bg-slate-200' onClick={()=>setSearch(recipes[index])} >
            <span className='p-3 font-semi-bold inline-flex '>{recipes[index]}</span>
          </div>
        )}
        

      </FixedSizeList>}
      {filteredRecipes.length>0 && <FixedSizeList
        className='center overflow-hidden'
        height={window.innerHeight * 0.5}
        itemCount={filteredRecipes.length}
        itemSize={50}
        width={window.innerWidth * 0.4}
      >
        {({ index, style }) => (
          <div style={style} className=' items-center rounded-lg m-2 hover:bg-slate-200' onClick={()=>setDish(filteredRecipes[index])} >
            <span className='p-3 font-semi-bold inline-flex '>{filteredRecipes[index]}</span>
          </div>
        )}
        

      </FixedSizeList>}
    </div>
          </CardBody>
          <CardFooter className="pt-0 justify-center">
            <div onClick={()=>transferValue()} className='center'>
          <a href="#_" class="relative rounded px-20 py-2 justify-center overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 p-4">
<span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
<span class="relative" >Select</span>
</a>
</div>
          </CardFooter>
        </Card>
      </Dialog>

    {res && <h1 className='flex font-bold text-5xl justify-center pl-3 mt-10 mb-10'>Meal suggestions:</h1>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg">
      {result.map((recipes, index) => (
        recipes.options.map((recipe,i)=>(
        <RecipeCard key={i} recipe={recipe} />
        ))
      ))}
    </div>
    </div>
    </>
    
  );
};

export default Diet;
