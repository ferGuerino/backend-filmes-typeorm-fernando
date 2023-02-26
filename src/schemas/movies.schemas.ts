import { z } from "zod";

const movieCreateSchema = z.object({
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
});

const returnMovieSchema = movieCreateSchema.extend({
  id: z.number(),
});

const returnAllMoviesSchema = returnMovieSchema.array();

const updateMovieSchema = movieCreateSchema.partial();

export { movieCreateSchema, returnMovieSchema, returnAllMoviesSchema, updateMovieSchema };
