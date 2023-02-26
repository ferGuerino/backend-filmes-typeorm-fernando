import {
  movieCreateSchema,
  returnMovieSchema,
  returnAllMoviesSchema,
  updateMovieSchema,
} from "../schemas/movies.schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

type iMovie = z.infer<typeof movieCreateSchema>;
type iMovieReturn = z.infer<typeof returnMovieSchema>;
type iMoviesReturn = z.infer<typeof returnAllMoviesSchema>;
type iMovieUpdate = DeepPartial<iMovie>;

interface iPagination {
  prevPage: string;
  nextPage: string;
  count: number;
  data: iMoviesReturn;
}

export { iMovie, iMovieReturn, iMoviesReturn, iMovieUpdate, iPagination };
