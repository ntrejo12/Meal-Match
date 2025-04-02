import { Link } from "react-router-dom";

function HomePage() {
  const handleClick = () => {
    console.log("button clicked");
  };

  return (
    <>
      <div className="get-started">
        <p className="welcome">
          Welcome to
        </p>
        <p className="title">
          Meal Match
        </p>
        <p className="tag-line">Your personalized recipe tool.</p>
        <Link to="/gettingstarted">
          <button className="button" onClick={handleClick}>
            GET STARTED
          </button>
        </Link>
        {/* <div className="button-container">
        <Link to="/gettingstarted">
          <div className="button">
            <p onClick={handleClick}>Get started</p>
          </div>
        </Link>
      </div> */}
      </div>
      <div className="floating-icon strawberry">
        <img src="src/assets/strawberry.png" width="100" height="100"></img>
      </div>
      <div className="floating-icon hamburger">
        <img src="src/assets/hamburger.png" width="100" height="100"></img>
      </div>
      <div className="floating-icon broccoli">
        <img src="src/assets/broccoli.png" width="100" height="100"></img>
      </div>
      <div className="floating-icon taco">
        <img src="src/assets/taco.png" width="100" height="100"></img>
      </div>
      <div className="floating-icon pizza">
        <img src="src/assets/pizza.png" width="100" height="100"></img>
      </div>
      <div className="floating-icon icecream">
        <img src="src/assets/popsicle.png" width="100" height="100"></img>
      </div>
      <div className="floating-icon sushi">
        <img src="src/assets/sushi.png" width="100" height="100"></img>
      </div>
      <div className="floating-icon donut">
        <img src="src/assets/donut.png" width="100" height="100"></img>
      </div>
      <div className="footer">
        <p>Made with ❤️ by Naydelin Trejo</p>
      </div>
    </>
  );
}

export default HomePage;
