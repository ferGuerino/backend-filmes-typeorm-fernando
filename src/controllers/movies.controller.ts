import { Request, Response } from "express";
import { iMovie } from "../interfaces/movies.interfaces";
import { createMovieServices, deleteMovieServices, listMoviesServices } from "../services";
import updateMovieServices from "../services/updateMovie.services";

const createMovieController = async (request: Request, response: Response) => {
  const movieData: iMovie = request.body;

  const newMovie = await createMovieServices(movieData);

  return response.status(201).json(newMovie);
};

const listMoviesController = async (request: Request, response: Response) => {
  const movies = await listMoviesServices();

  return response.status(200).json(movies);
};

const deleteMovieController = async (request: Request, response: Response) => {
  const idData: number = +request.params.id;

  await deleteMovieServices(idData);

  return response.status(204).json();
};

const updateMovieController = async (request: Request, response: Response) => {
  const movieData = request.body;
  const idMovie = +request.params.id;

  const updatedMovie = await updateMovieServices(movieData, idMovie);

  return response.status(201).json(updatedMovie);
};

export { createMovieController, listMoviesController, deleteMovieController, updateMovieController };
