import {
  movieSchema,
  returnMovieSchema,
  returnAllMoviesSchema,
  updateMovieSchema,
} from "../schemas/movies.schemas";
import { TypeOf, z } from "zod";

type iMovie = z.infer<typeof movieSchema>;
type iMovieReturn = z.infer<typeof returnMovieSchema>;
type iMoviesReturn = z.infer<typeof returnAllMoviesSchema>;
type iMovieUpdate = z.infer<typeof updateMovieSchema>;

export { iMovie, iMovieReturn, iMoviesReturn, iMovieUpdate };
