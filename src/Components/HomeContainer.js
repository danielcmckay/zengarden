import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Favorites from "../Pages/Favorites";
import QuoteContainer from "./QuoteContainer";
import { Route } from "react-router-dom";

import "./HomeContainer.css";

const HomeContainer = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (localStorage["favorites"]) {
      const favoritesFromLS = localStorage.getItem("favorites");
      setFavorites(JSON.parse(favoritesFromLS));
    } else {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  }, []);

  const addToFavoritesHandler = (passedQuote) => {
    let newFavorites = [...favorites];
    if (!favorites.includes(passedQuote)) {
      newFavorites.push(passedQuote);
      const newFavStringify = JSON.stringify(newFavorites);
      localStorage.setItem("favorites", newFavStringify);
      setFavorites(newFavorites);
    }
  };

  const removeFavoritesHandler = (passedQuote) => {
    let newFavorites = favorites.filter((fav) => fav !== passedQuote);
    const newFavStringify = JSON.stringify(newFavorites);
    localStorage.setItem("favorites", newFavStringify);
    setFavorites(newFavorites);
  };

  return (
    <div className="HomeContainer">
      <NavBar />
      <Route
        exact
        path="/favorites"
        render={() => (
          <Favorites
            favoritesList={favorites}
            removeFavorite={removeFavoritesHandler}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={() => <QuoteContainer favorite={addToFavoritesHandler} />}
      />
    </div>
  );
};

export default HomeContainer;
