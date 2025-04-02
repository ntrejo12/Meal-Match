import { useContext, useEffect, useState } from "react";
import { Context } from "./Context.jsx";
import axios from "axios"; // allow to make http calls to api
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./GetRecipes.css";

function GetRecipes() {
  // state variable which will store a recipe

  const { diet, ingredient, vitaminD, vitaminC, fiber, protein, time } =
    useContext(Context);

  const [allRecipes, setAllRecipes] = useState([]);
  // react hooks can't be used inside async functions

  async function getRecipe() {
    try {
      const apiKey = "92185b09f819417b8a184b00482ef799";
      const fillIngredients = true;
      const instructionsRequired = true;
      const addRecipeInformation = true;
      const addRecipeInstructions = true;
      const number = 6;

      // what's the difference between ' and `

      let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&fillIngredients=${fillIngredients}&instructionsRequired=${instructionsRequired}&addRecipeInformation=${addRecipeInformation}&addRecipeInstructions=${addRecipeInstructions}&number=${number}`;

      // if user chose a diet
      if (diet != "None") {
        url += `&diet=${diet}`;
      }
      // if ingredient field is not blank
      if (ingredient != "") {
        url += `&excludeIngredients=${ingredient}`;
      }
      // if user chooses any ingredients
      if (vitaminD == true) {
        url += `&minVitaminD=${5}`;
      }
      if (vitaminC == true) {
        url += `&minVitaminC=${5}`;
      }
      if (fiber == true) {
        url += `&minFiber=${5}`;
      }
      if (protein == true) {
        url += `&minProtein=${20}`;
      }
      if (time > 0) {
        url += `&maxReadyTime=${time}`;
      }

      console.log("API Call URL", url);

      // //making api call `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${diet}&excludeIngredients=${ingredient}&fillIngredients=${fillIngredients}&instructionsRequired=${instructionsRequired}&addRecipeInformation=${addRecipeInformation}&addRecipeInstructions=${addRecipeInstructions}&number=${number}`
      let resp = await axios.get(url);

      // get a random recipe from array returned

      setAllRecipes(resp.data.results);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <>
    {/* style MUI directly using sx prop */}
    {/*column spacing sets horizontal space btw columns and is responsive depending on screen size*/}
    {/* sx={{ border: "1px solid black" }} */}
      <Grid container rowSpacing={0} columnSpacing={{ xs: 3, sm: 7, md: 2 }} sx={{ justifyContent: "space-between", alignItems: "center"}}> 
        {/*curly braces for variables, css or text in quotation*/}
        {allRecipes?.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <Grid size={12}>
              {/*set consisten width and height*/}
              <Card style={{ width: 500, height: 350, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "scroll"}}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={recipe?.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <div>
                      Name:
                      <a target="_blank" href={recipe?.sourceUrl}>
                        {recipe?.title}
                      </a>
                    </div>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <div className="ingredients">
                      <div>Ingredients needed:</div>
                      {recipe?.extendedIngredients.map((ingredient, index) => (
                        <span key={index}>
                          {index != recipe?.extendedIngredients.length - 1
                            ? ingredient.name + ", "
                            : ingredient.name}
                        </span>
                      ))}
                      {recipe?.analyzedInstructions.map((instruction) => (
                        <ol>
                          {instruction.steps?.map((step) => (
                            <li>{step.step}</li>
                          ))}
                        </ol>
                      ))}
                    </div>
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* add print */}
                  <Button size="small">Add to favorites</Button>
                  <Button size="small" onClick={() => window.print()}>
                    Print
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </div>
        ))}
      </Grid>
    </>
  );
}
export default GetRecipes;
