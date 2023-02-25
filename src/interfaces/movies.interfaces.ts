import {
  movieSchema,
  returnMovieSchema,
  returnAllMoviesSchema,
  updateMovieSchema,
} from "../schemas/movies.schemas";
import { TypeOf, z } from "zod";
import { DeepPartial } from "typeorm";

type iMovie = z.infer<typeof movieSchema>;
type iMovieReturn = z.infer<typeof returnMovieSchema>;
type iMoviesReturn = z.infer<typeof returnAllMoviesSchema>;
type iMovieUpdate = DeepPartial<iMovie>;

export { iMovie, iMovieReturn, iMoviesReturn, iMovieUpdate };
