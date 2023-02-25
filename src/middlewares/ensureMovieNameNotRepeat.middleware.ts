import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const ensureMovieNameNotRepeat = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  if (!request.body.name) {
    return next();
  }

  const findMovieName: Movie | null = await movieRepository.findOne({
    where: {
      name: request.body.name,
    },
  });

  console.log(findMovieName);

  if (findMovieName) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

export default ensureMovieNameNotRepeat;
