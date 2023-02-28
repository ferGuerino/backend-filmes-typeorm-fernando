import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMoviesReturn, iPagination } from "../interfaces/movies.interfaces";
import { returnAllMoviesSchema } from "../schemas/movies.schemas";

const listMoviesServices = async (queryData: any): Promise<iPagination> => {
  console.log(queryData.page, queryData.perPage, queryData.order);
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let skip: number = +queryData.page;
  let take: number = +queryData.perPage;
  let sort: string = queryData.sort;
  let getOrder: string = queryData.order;
  let order: Object = {};

  if (!getOrder || (getOrder.toUpperCase() != "ASC" && getOrder.toUpperCase() != "DESC")) {
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
    order = { price: getOrder.toUpperCase() };
  }
  if (sort === "duration") {
    order = { duration: getOrder.toUpperCase() };
  }
  const orderMovies: Array<Movie> = await movieRepository.find({
    take,
    skip: take * (skip - 1),
    order,
  });

  const countMovies = await movieRepository.findAndCount();

  const movies = returnAllMoviesSchema.parse(orderMovies);

  const baseUrl: string = `http://localhost:3000/movies`;

  let countPage: number = skip;
  let countPerPage: number = orderMovies.length;
  let prevPage: string | null = `${baseUrl}?page=${countPage - 1}&perPage=${take}`;
  let nextPage: string | null = `${baseUrl}?page=${countPage + 1}&perPage=${take}`;

  if (countPage === 1 || !countPage) {
    prevPage = null;
  }
  if (countPerPage === 0 || countPerPage < take) {
    nextPage = null;
  }

  let returnMoviesPage: iPagination = {
    prevPage: prevPage,
    nextPage: nextPage,
    count: countMovies[1],
    data: movies,
  };

  return returnMoviesPage;
};

export default listMoviesServices;
