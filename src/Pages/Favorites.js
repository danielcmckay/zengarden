import React, { useState, useEffect } from "react";
import "./Favorites.css";
import Share from '../Components/Share';


const Favorites = props => {
  const [isCopied, setCopied] = useState(false);

  let favorites = [];

  function getFavoritesFromLS() {
    favorites = JSON.parse(window.localStorage.getItem("favorites"));
  }

  useEffect(() => {
    getFavoritesFromLS();
  }, []);

  const copyClickHandler = (e) => {
    e.stopPropagation();
    e.target.className = "far fa-copy Copied";
    setCopied(true);
  }

  const populateFavorites = props.favoritesList.map(favorite => {
    return (
      <li key={favorite.id}>
        {favorite.quote} – {favorite.name}{" "}
       <Share quote={favorite.quote} name={favorite.name} copy={copyClickHandler}/>
        {' '}
        <i className="fa fa-trash" onClick={() => props.removeFavorite(favorite)}></i>
      </li>
    );
  });

  const noFavorites = <li>Looks like you don't have any favorites yet!</li>;

  return (
    <div className="Favorites">
      <h3>Your favorites</h3>
      <ul className="FavoritesList">{props.favoritesList.length > 0 ? populateFavorites : noFavorites}</ul>
    </div>
  );
};

export default Favorites;
