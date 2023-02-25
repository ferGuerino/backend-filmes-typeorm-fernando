import { Router } from "express";
import {
  createMovieController,
  listMoviesController,
  deleteMovieController,
  updateMovieController,
} from "../controllers/movies.controller";
import { ensureDataIsValid, ensureMovieExists, ensureMovieNameNotRepeat } from "../middlewares";
import { movieSchema, updateMovieSchema } from "../schemas/movies.schemas";

const movieRoutes: Router = Router();

movieRoutes.post("", ensureDataIsValid(movieSchema), ensureMovieNameNotRepeat, createMovieController);
movieRoutes.get("", listMoviesController);
movieRoutes.delete("/:id", ensureMovieExists, deleteMovieController);
movieRoutes.patch(
  "/:id",
  ensureDataIsValid(updateMovieSchema),
  ensureMovieExists,
  ensureMovieNameNotRepeat,
  updateMovieController
);

export default movieRoutes;
