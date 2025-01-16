import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWNkZjczMDVhNDg2MGUzNTliMzYwZjUzMWI4N2NlNyIsIm5iZiI6MTczNzAxMTQyOC42MDcsInN1YiI6IjY3ODhiMGU0ODY3N2JkZmFkZmFkMTcwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JC8pQivcnh9W2j-IyT25CTleME5hHJfYazAEOkct1z4",
  },
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      "/trending/movie/day?language=en-US",
      options
    );
    return response.data.results;
  } catch (error) {
    console.error("Помилка при отриманні трендових фільмів:", error.message);
    return [];
  }
};

export const fetchMoviesByQuery = async (query) => {
  try {
    const response = await axios.get(
      `/search/movie?query=${query}&language=en-US&page=1`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.error("Помилка при пошуку фільмів:", error.message);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}?language=en-US`, options);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні деталей фільму:", error.message);
    return null;
  }
};

export const fetchMovieCast = async (id) => {
  try {
    const response = await axios.get(
      `/movie/${id}/credits?language=en-US`,
      options
    );
    return response.data.cast;
  } catch (error) {
    console.error("Помилка при отриманні акторського складу:", error.message);
    return [];
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axios.get(
      `/movie/${id}/reviews?language=en-US`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.error("Помилка при отриманні відгуків на фільм:", error.message);
    return [];
  }
};
