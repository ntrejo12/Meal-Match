import React, { useState } from "react";

// react context is a way to share state across react components  
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [items, setItems] = useState(0);
    const [diet, setDiet] = useState("0");
    const [ingredient, setIngredient] = useState("");
    const [vitaminD, setVitaminD] = useState(false);
    const [vitaminC, setVitaminC] = useState(false);
    const [fiber, setFiber] = useState(false);
    const [protein, setProtein ] = useState(false);
    const [time, setTime ] = useState(0);

    return(
        <Context.Provider value={{ items, setItems, diet, setDiet, ingredient, setIngredient,
            vitaminD, setVitaminD, vitaminC, setVitaminC, fiber, setFiber, protein, setProtein, time, setTime
          }}>
            {children}
        </Context.Provider>
    )
}