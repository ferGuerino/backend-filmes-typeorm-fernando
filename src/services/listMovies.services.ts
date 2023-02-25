import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMoviesReturn } from "../interfaces/movies.interfaces";
import { returnAllMoviesSchema } from "../schemas/movies.schemas";

const listMoviesServices = async (): Promise<iMoviesReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovies: Array<Movie> = await movieRepository.find();

  const movies = returnAllMoviesSchema.parse(findMovies);

  return movies;
};

export default listMoviesServices;
