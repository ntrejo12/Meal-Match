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
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./GetRecipes.css";

function GetRecipes() {

  const { diet, ingredient, vitaminD, vitaminC, fiber, protein, time } =
    useContext(Context);

  // state variable which will store a recipe
  const [allRecipes, setAllRecipes] = useState([]);
  // react hooks can't be used inside async functions

  // use state hook to track which recipes are liked
  const [likedRecipes, setLikedRecipes] = useState([]);

  const [newRecipeID, setNewRecipeID] = useState([]);

  function toggleLike(id) {
    // check if recipe is already in the likedRecipes array
    // find() returns recipe object if found
    // arrow function:
    // (recipe) - parameter, represents one item in an array
    // => is shorthand for defining functions
    // recipe.id === id is the actual condition your checking
    // comparing the id property of the current recipe object
    // to variable id that was passed in
    const isLiked = likedRecipes.find((recipe) => recipe.id === id);

    // if recipe is already liked, handles unliking
    if (isLiked) {
      // creates a new array w/o recipe you unlike and updates state w/ new filtered array
      // returns new array, doesn't mutate original
      setLikedRecipes(likedRecipes.filter((recipe) => recipe.id !== id));
      setNewRecipeID(newRecipeID.filter((newRecipeID) => newRecipeID !== id));
    } else {
      // if recipe is not already liked, handles liking
      // look for recipe object in allRecipes
      const favorite = allRecipes.find((recipe) => id === recipe.id);
      setLikedRecipes([...likedRecipes, favorite]);
      setNewRecipeID([...newRecipeID, id]);
    }
  }
  console.log("liked recipes array", likedRecipes);
  console.log("LIKED Recipe ID", newRecipeID);

  async function getRecipe() {
    try {
      // const apiKey = API KEY HERE;
      const fillIngredients = true;
      const instructionsRequired = true;
      const addRecipeInformation = true;
      const addRecipeInstructions = true;
      const number = 6;

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
      {/* favorites menu dropdown */}
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites
        </button>
        <ul className="dropdown-menu">
          {likedRecipes?.map((recipe) => {
            const { id, title, sourceUrl } = recipe;
            return (
              <li key={id}>
                <a className="dropdown-item" href={sourceUrl} target="_blank">
                  {recipe.title}
                </a>
              </li>
            );
          })}
          {/* <li>
            <hr className="dropdown-divider"></hr>
          </li> */}
        </ul>
      </div>
      {/* style MUI directly using sx prop */}
      {/*column spacing sets horizontal space btw columns and is responsive depending on screen size*/}
      {/* sx={{ border: "1px solid black" }} */}
      <div style={{ paddingTop: "50px" }}>
        <Grid
          container
          rowSpacing={0}
          columnSpacing={{ xs: 3, sm: 7, md: 2 }}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          {/*curly braces for variables, css or text in quotation*/}
          {allRecipes?.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <Grid size={12}>
                {/*set consisten width and height*/}
                <Card
                  style={{
                    width: 400,
                    height: 350,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    overflow: "scroll",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={recipe?.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <div className="recipe-name">
                      {recipe?.title}
                        {/* <a target="_blank" href={recipe?.sourceUrl}>
                        </a> */}
                      </div>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      <div className="ingredients">
                        <div>Ingredients needed:</div>
                        {recipe?.extendedIngredients.map(
                          (ingredient, index) => (
                            <span key={index}>
                              {index != recipe?.extendedIngredients.length - 1
                                ? ingredient.name + ", "
                                : ingredient.name}
                            </span>
                          )
                        )}
                        <br></br>
                        <br></br>
                        Instructions:
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
                    {/* ADD TO FAVORITES BUTTON */}
                    <button
                      className="recipe-action-btn"
                      onClick={() => toggleLike(recipe.id)} // calls toggle function for current recipe
                      style={{
                        color:
                          newRecipeID.findIndex(
                            (item) => recipe.id === item
                          ) !== -1
                            ? "red"
                            : "grey",
                      }} // if true (is liked), turn icon red, if false, color grey
                    >
                      {/* <i className="fa-regular fa-heart"></i> */}
                      {/* ? : ternary operator
                    condition ? valueIfTrue : valueIfFalse */}
                      <i
                        className={
                          newRecipeID.findIndex(
                            (item) => recipe.id === item
                          ) !== -1
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }
                      ></i>
                    </button>
                    {/* PRINT BUTTON */}
                    <button
                      className="recipe-action-btn"
                      onClick={() => window.print()}
                    >
                      <i className="fa-solid fa-print"></i>
                    </button>
                  </CardActions>
                </Card>
              </Grid>
            </div>
          ))}
        </Grid>
      </div>
    </>
  );
}
export default GetRecipes;
