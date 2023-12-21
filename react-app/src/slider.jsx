//import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const valuetext = (value) => `${value}`;

const generateMarks = (min, max, step) => {
  const marks = [];
  for (let i = min; i <= max; i += step) {
    marks.push({ value: i, label: `${i}` });
  }
  return marks;
};

//function out here that has query body

//function that runs the query

const TimeSlider = ({ sliderValue, setSliderValue }) => {
  // call them inside of the slider

  /* const refreshData = useCallback(
    () =>
      issueQuery(GenerateQueryBody(ledger, sliderValue), apiKey)
        .then((response) => {
          setEntities(response.data);
          setSelected(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        }),
    [setEntities, setSelected, sliderValue]
  );

  useEffect(() => { 
    //if (entities.length > 0) return;
    refreshData();
  }, [sliderValue]); */ //replace with nothing that means it runs on 'mount'

  // get query back adn se

  const min = 0; // Minimum value
  const max = 100; // Maximum value
  const step = 10; // Step value

  const marks = generateMarks(min, max, step);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <Box sx={{ width: 600 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={30}
        getAriaValueText={valuetext}
        step={1}
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
};

TimeSlider.displayName = "TimeSlider";

export default TimeSlider; // don't have to destructure the name
