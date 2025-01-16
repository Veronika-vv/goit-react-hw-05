import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/movie-api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <ul className={css.castList}>
      {cast.map(({ id, name, profile_path, character }) => (
        <li key={id} className={css.actor}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                : "https://via.placeholder.com/150"
            }
            alt={name}
            className={css.actorImage}
          />
          <p className={css.actorName}>{name}</p>
          <p className={css.actorCharacter}>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
