import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMoviesReturn } from "../interfaces/movies.interfaces";
import { returnAllMoviesSchema } from "../schemas/movies.schemas";

const listMoviesServices = async (queryData: any): Promise<iMoviesReturn> => {
  console.log(queryData.page, queryData.perPage, queryData.order);
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let skip: number = +queryData.page;
  let take: number = +queryData.perPage;
  let sort: string = queryData.sort;
  let getOrder: string = queryData.order;
  let order: Object = {};

  if (!getOrder || (getOrder != "ASC" && getOrder != "DESC")) {
    getOrder = "ASC";
  }

  if (take < 0 || take > 5 || !take || Number.isInteger(take) === false) {
    take = 5;
  }

  if (skip < 1 || Number.isInteger(skip) === false) {
    skip = 1;
  }

  if (!sort || (sort != "price" && sort != "duration")) {
    order = { id: "ASC" };
  }

  if (sort === "price") {
    order = { price: getOrder };
  }
  if (sort === "duration") {
    order = { duration: getOrder };
  }
  const orderMovies: Array<Movie> = await movieRepository.find({
    take,
    skip: take * (skip - 1),
    order,
  });

  const movies = returnAllMoviesSchema.parse(orderMovies);

  return movies;
};

export default listMoviesServices;
