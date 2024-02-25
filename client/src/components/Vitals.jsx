import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
} from "@material-tailwind/react";

export default function Vitals({ open, setOpen }) {
  const { currentUser } = useSelector((state) => state.user) ?? { currentUser: null };
  const [formData, setFormData] = useState({
    age: 0,
    weight: 0,
    height: 0,
    gender: "",
    activityLevel: 1.5,
    userRef: currentUser ? currentUser._id : null
  });

  const handleOpen = () => setOpen((cur) => !cur);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData,
          userRef: currentUser ? currentUser._id : null,
        }),
      });
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            <Input
              size="lg"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Weight
            </Typography>
            <Input
              size="lg"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Height
            </Typography>
            <Input
              size="lg"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Gender
            </Typography>
            <Select
              size="lg"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <Typography className="-mb-2" variant="h6">
              Activity level:
            </Typography>
            <Select
              size="lg"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
            >
              <option value="amateur">Amateur</option>
              <option value="medium">Medium</option>
              <option value="advanced">Advanced</option>
            </Select>
          </CardBody>
          <CardFooter className="pt-0">
            <Link to={"/"}>
            <Button
              variant="gradient"
              onClick={handleSubmit}
              fullWidth
              className="bg-green-600"
            >
              Submit
            </Button>
            </Link>
            <Typography
              variant="small"
              className="mt-4 flex justify-center"
            >
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
