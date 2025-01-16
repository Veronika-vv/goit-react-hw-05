import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { fetchMovieDetails } from "../../api/movie-api";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const goBack = useRef(location.state || "/");
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details.");
        console.error(err);
      }
    };

    if (movieId) {
      fetchDetails();
    } else {
      setError("Movie ID is missing.");
    }
  }, [movieId]);

  if (error) return <p>{error}</p>;

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={css.container}>
      <Link className={css.btn} to={goBack.current}>
        Go back
      </Link>
      <div className={css.details}>
        <img
          className={css.img}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
        />
        <div className={css.div}>
          <h2 className={css.title}>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          <p>
            <strong>User Score:</strong> {movie.vote_average * 10}%
          </p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <h3>Additional information</h3>
      <ul className={css.links}>
        <li>
          <Link to="cast" className={css.link}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" className={css.link}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
