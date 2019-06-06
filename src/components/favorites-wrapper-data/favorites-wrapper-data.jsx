import React from "react";
import FavoritesList from "../favorites-list";

const FavoritesWrapperData = () => {
  return <React.Fragment>
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoritesList/>
        </section>
      </div>
    </main>
  </React.Fragment>;
};

export default FavoritesWrapperData;
