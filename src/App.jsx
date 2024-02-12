import { useState, useEffect, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// function imports
import {
  fetchApi,
  fetchApiKeyword,
  fetchApiConfig,
  fetchApiCast,
  fetchApiReviews,
} from "./service/fetchFn";

// component imports
const Home = lazy(() => import("./pages/home/Home.jsx"));
const Movies = lazy(() => import("./pages/movies/index.jsx"));
const MovieCard = lazy(() => import("./pages/movies/movie/Movie.jsx"));
const MovieCardCast = lazy(() => import("./pages/movies/cast/Cast.jsx"));
const MovieCardReviews = lazy(() =>
  import("./pages/movies/reviews/Reviews.jsx")
);
const WebAppTemplate = lazy(() =>
  import("./components/webAppTemplate/WebAppTemplate.jsx")
);
const NotExist = lazy(() => import("./components/notExist/NotExist.jsx"))

const App = () => {
  const [trending, setTrending] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [value, setValue] = useState("");
  const [imageBaseUrlSmall, setImageBaseUrlSmall] = useState("");
  const [castDetails, setCastDetails] = useState([]);
  const [reviewsDetails, setReviewsDetails] = useState([]);

  const setInputValue = (evt) => {
    const inputValue = evt.target.value;
    setValue(inputValue);
  };

  const handlingFetchApiKeyword = () => {
    fetchApiKeyword(value).then((movie) => {
      setSearchedMovies(movie.data.results);
    });
  };

  // HANDLING CAST
  const handlingLoadingCast = (movieId) => {
    fetchApiConfig()
      .then((image) => {
        setImageBaseUrlSmall(image.base_url + image.poster_sizes[1]);
      })
      .then(() => {
        fetchApiCast(movieId).then((cast) => {
          const newCastDetails = [];

          cast.map((actor) =>
            newCastDetails.push({
              id: actor.id,
              name: actor.name,
              character: actor.character,
              image: actor.profile_path,
            })
          );
          setCastDetails(newCastDetails);
        });
      });
  };

  // HANDLING REVIEWS
  const handlingLoadingReviews = (movieId) => {
    fetchApiReviews(movieId).then((reviews) => {
      const newReviewsDetails = [];

      reviews.map((review) =>
        newReviewsDetails.push({
          id: review.id,
          author: review.author,
          content: review.content,
        })
      );
      setReviewsDetails(newReviewsDetails);
    });
  };

  // LOAD TRENDING MOVIES
  useEffect(() => {
    fetchApi().then((data) => {
      setTrending(data.data.results);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<WebAppTemplate />}>
          {/* HOME */}
          <Route index element={<Home trending={trending} />} />

          {/* MOVIES - INDEX */}
          <Route
            path="/movies"
            element={
              <Movies
                setInputValue={setInputValue}
                fetchApiKeyword={handlingFetchApiKeyword}
                searchedMovies={searchedMovies}
              />
            }
          />

          {/* MOVIES - MOVIE CARD */}
          <Route
            path="/movies/:movieId"
            element={
              <MovieCard
                handlingLoadingCast={handlingLoadingCast}
                handlingLoadingReviews={handlingLoadingReviews}
              />
            }
          >
            <Route
              path="cast"
              element={
                <MovieCardCast
                  castDetails={castDetails}
                  imageBaseUrlSmall={imageBaseUrlSmall}
                />
              }
            />
            <Route
              path="reviews"
              element={<MovieCardReviews reviewsDetails={reviewsDetails} />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotExist/>}/>
      </Routes>
    </>
  );
};

export default App;
