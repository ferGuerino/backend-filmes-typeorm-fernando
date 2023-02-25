import { z } from "zod";

const movieSchema = z.object({
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number(),
  price: z.number(),
});

const returnMovieSchema = movieSchema.extend({
  id: z.number(),
});

const returnAllMoviesSchema = returnMovieSchema.array();

const updateMovieSchema = movieSchema.partial();

export { movieSchema, returnMovieSchema, returnAllMoviesSchema, updateMovieSchema };
