import React, { useState } from "react";
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
  Select,
} from "@material-tailwind/react";

export default function Vitals({ open, setOpen }) {
  const [gender, setGender] = useState(""); 
  const [height, setHeight] = useState(0);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(1);
  const [activityLevel,setActivityLevel]=useState(1.5)
  const [age, setAge] = useState(0);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSubmit=async()=>{

  }

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none p-3 rounded-lg"
      >
        <Card className="mx-auto w-full max-w-[24rem] p-5 h-80vh">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Enter your vitals
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Please enter your age, weight, height, gender, and activity level.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Age
            </Typography>
            <Input size="lg" />
            <Typography className="-mb-2" variant="h6">
              Weight
            </Typography>
            <Input size="lg" />
            <Typography className="-mb-2" variant="h6">
              Height
            </Typography>
            <Input size="lg" />
            <Typography className="-mb-2" variant="h6">
              Gender
            </Typography>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={() => {setMale(1);setFemale(0)}}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={() => {setMale(0);setFemale(1)}}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <Typography className="-mb-2" variant="h6">
              Activity level:
            </Typography>
            <div className="flex items-center gap-4">
              <Select
                size="lg"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                <option value="amateur">Amateur</option>
                <option value="medium">Medium</option>
                <option value="advanced">Advanced</option>
              </Select>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth className="bg-green-600">
              Submit
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
