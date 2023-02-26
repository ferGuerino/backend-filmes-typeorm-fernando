import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMovieReturn, iMovieUpdate } from "../interfaces/movies.interfaces";
import { returnMovieSchema, updateMovieSchema } from "../schemas/movies.schemas";

const updateMovieServices = async (movieData: iMovieUpdate, idMovie: number): Promise<iMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovieData = await movieRepository.findOneBy({
    id: idMovie,
  });

  const movie = movieRepository.create({
    ...findMovieData,
    ...movieData,
  });

  await movieRepository.save(movie);

  const updatedMovie = returnMovieSchema.parse(movie);

  return updatedMovie;
};

export default updateMovieServices;
