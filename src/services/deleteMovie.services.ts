import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

const deleteMovieServices = async (idMovie: number): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovie = await movieRepository.findOne({
    where: {
      id: idMovie,
    },
  });

  await movieRepository.remove(findMovie!);
};

export default deleteMovieServices;
