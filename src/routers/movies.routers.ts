import { Router } from "express";
import {
  createMovieController,
  listMoviesController,
  deleteMovieController,
  updateMovieController,
} from "../controllers/movies.controller";
import { ensureDataIsValid, ensureMovieExists, ensureMovieNameNotRepeat } from "../middlewares";
import { movieCreateSchema, updateMovieSchema } from "../schemas";

const movieRoutes: Router = Router();

movieRoutes.post(
  "",
  ensureDataIsValid(movieCreateSchema),
  ensureMovieNameNotRepeat,
  createMovieController
);
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
