import { useState } from "react";
import Search from "../../component";
import RecipeItem from "../../component/recipe-item";
import "./style.css";

const dummydata = "dummydata";

const Homepage = () => {
  //loading state
  const [loadingState, setloadingState] = useState(false);

  //save result that we receive from api
  const [recipes, setRecipes] = useState([]);

  const getDataFromSearchComponent = (getData) => {
    //keep the loading state is true before we calling the api
    setloadingState(true);
    console.log(getData, "getData");

    // Calling the api

    async function getReceipies() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=cb589295d7114ccab7e50c4f95614311&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        //set Loading state flase again
        //set Recipes  state

        setloadingState(false);
        setRecipes(results);
      }

      console.log(result);
    }

    getReceipies();
  };

  console.log(loadingState, recipes, "loadingState, recipes");

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummydata={dummydata}
      />

      {/* show loding state */}

      {loadingState && (
        <div className="loading"> loading recipes ! Please wait.</div>
      )}
      {/* show loding state */}

      {/* map through all recipes */}
      <div className="item">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem id={item.id} image={item.image} title={item.title} />
            ))
          : null}
      </div>
      {/* map through all recipes */}
    </div>
  );
};

export default Homepage;
