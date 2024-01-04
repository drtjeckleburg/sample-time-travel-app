import { useEffect, useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { HitAPI, ToggleDimensions, history } from "./fluree-client";
const apiKey = import.meta.env.VITE_API_KEY;
const ledger = import.meta.env.VITE_LEDGER;

const marks = [
  {
    value: 2,
    label: "2005",
  },
  {
    value: 7,
    label: "2010",
  },
  {
    value: 12,
    label: "2015",
  },
  {
    value: 17,
    label: "2020",
  },
];

const TimeSlider = ({ sliderValue, setSliderValue }) => {
  const [maxT, setMaxT] = useState(1); //declare state initialize state value and setter

  const refreshData = () => {
    //lowercase is a function capital letters are for components -> returning jsx rendered in dom
    console.log("refresh data called");
    HitAPI(ToggleDimensions(ledger), apiKey, history)
      .then((response) => {
        console.log(response.data);
        const newTValue = response.data[0]["f:commit"]["f:data"]["f:t"];
        console.log(newTValue);
        setMaxT(newTValue);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refreshData();
  }, []); //empty dependency array for useEffect means it will run on mount

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  //const marks = [1, maxT, 10];

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <Box sx={{ width: 600 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={10}
        step={1}
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks={marks}
        min={1}
        max={maxT}
      />
    </Box>
  );
};

TimeSlider.displayName = "TimeSlider";

export default TimeSlider;
