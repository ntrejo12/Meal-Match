/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { Box, Slider } from "@mui/material";
import { Link } from "react-router-dom";
import { Context } from "./Context.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./GetStarted.css";

function GetStarted() {
  const { diet, setDiet, ingredient, setIngredient, vitaminD, setVitaminD, 
    vitaminC, setVitaminC, fiber, setFiber, protein, setProtein, time, setTime } = useContext(Context);

  // const [ingredient, setIngredient] = useState("");
  // const [diet, setDiet] = useState("0");
  // const [vitaminD, setVitaminD] = useState(false);
  // const [vitaminC, setVitaminC] = useState(false);
  // const [fiber, setFiber] = useState(false);

  const handleChange = (event) => {
    setDiet(event.target.value);
  };

  const handleIngredientChange = (event) => {
    setIngredient(event.target.value);
  };

  const VitaminD = () => {
    setVitaminD(!vitaminC);
  };

  const VitaminC = () => {
    setVitaminC(!vitaminC);
  };

  const Fiber = () => {
    setFiber(!fiber);
  };

  const Protein = () => {
    setProtein(!protein);
  };

  // slider
  const marks = [
    {
      value: 10,
      label: "< 10",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 70,
      label: "70",
    },
    {
      value: 90,
      label: "90 <",
    },
  ];

  const Time = (event) => {
    setTime(event.target.value)
  };

  function valuetext(value) {
    return "${value}C";
  }

  const handleClick = () => {
    console.log("Get recipes click");
  };

  return (
    // p and div are sibling elements, they exist at same level inside return
    // all elements must be wrapped inside one parent element
    <>
      <div className="card" id="Two">
        <div className="card-body">
          <h5 className="card-title">Lets find your perfect meal</h5>
          <p className="card-text">Choose your preferences below.</p>
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="defaultSelect" className="form-label">
                Dietary Restrictions
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(event) => handleChange(event)}
                value={diet}
              >
                <option value="0">Select an option</option>
                <option value="Gluten free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Paleo">Paleo</option>
                <option value="None">None</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Ingredients to Avoid
              </label>
              <input
                type="text"
                id="exampleFormControlInput1"
                className="form-control"
                aria-describedby="ingredientsHelpBlock"
                placeholder="Allergies or dislikes"
                onChange={(event) => handleIngredientChange(event)}
                value={ingredient}
              />
              <div id="ingredientsHelpBlock" className="form-text">
                Leave blank if none.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="vitamin-select" className="form-label">
                Search by Nutrients
              </label>
            </div>
            <div>
              {" "}
              {/* nutrients */}
              <div className="form-check form-check-inline">
                {/* ()=> it waits until you actually click the checkbox, otherwise on load it'll jsut go between the function and textbox click */}
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value={vitaminD}
                  onChange={() => VitaminD()}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  Vitamin D
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value={vitaminC}
                  onChange={() => VitaminC()}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox2">
                  Vitamin C
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value={fiber}
                  onChange={() => Fiber()}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox2">
                  Fiber
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value={protein}
                  onChange={() => Protein()}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox2">
                  Protein
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Time to Prep (in min)
              </label>
              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="Custom marks"
                  /*defaultValue={0}*/
                  value={time}
                  onChange={(event) => Time(event)}
                  getAriaValueText={valuetext}
                  step={10}
                  valueLabelDisplay="auto"
                  marks={marks}
                />
              </Box>
            </div>
            <Link to="/getrecipes">
              <a href="#" className="btn btn-primary" onClick={handleClick}>
                Get recipes
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
