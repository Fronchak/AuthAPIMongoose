import MovieInputDTO from "../dtos/movie/movie-input-dto";
import genreService from "./genre-service";
import Movie, { IMovie } from "../models/movie";
import Genre from "../models/genre";
import MovieOutputDTO from "../dtos/movie/movie-output-dto";
import EntityNotFoundError from "../errors/entity-not-found-error";
import { Document, Types } from "mongoose";

class MovieService {

    public async save(inputDTO: MovieInputDTO): Promise<MovieOutputDTO> {
        const genre = await Genre.findById(inputDTO.idGenre);
        if(!genre) {
            throw new EntityNotFoundError('Genre not found');
        }
        const movie = new Movie({
            title: inputDTO.title,
            synopsis: inputDTO.synopsis,
            genre: inputDTO.idGenre
        });
        await movie.save();
        return await this.findById(movie._id.toString());
    }

    public async findAll(): Promise<Array<MovieOutputDTO>> {
        const movies = await Movie.find().populate('genre');
        return movies.map((movie) => this.convertEntityToDTO(movie));
    }

    private convertEntityToDTO(entity: Omit<Document<unknown, {}, IMovie> & Omit<IMovie & {
        _id: Types.ObjectId;
    }, never>, never>): MovieOutputDTO {
        return {
            id: entity._id.toString(),
            title: entity.title,
            synopsis: entity.synopsis,
            genre: {
                id: entity.genre._id.toString(),
                name: (entity.genre as any)?.name
            }
        }
    }

    public async findById(id: string): Promise<MovieOutputDTO> {
        const movie = await Movie.findById(id).populate('genre');
        if(!movie) {
            throw new EntityNotFoundError('Movie not found');
        }
        return this.convertEntityToDTO(movie);
    }

    public async update(inputDTO: MovieInputDTO, id: string): Promise<MovieOutputDTO> {
        const movie = await Movie.findById(id);
        if(!movie) {
            throw new EntityNotFoundError('Movie not found');
        }
        const genre = await Genre.findById(inputDTO.idGenre);
        if(!genre) {
            throw new EntityNotFoundError('Genre not found');
        }
        await Movie.findByIdAndUpdate(id, {
            title: inputDTO.title,
            synopsis: inputDTO.synopsis,
            genre: inputDTO.idGenre
        });
        return  await this.findById(id);
    }

    public async deleteById(id: string): Promise<void> {
        const movie = await Movie.findById(id);
        if(!movie) {
            throw new EntityNotFoundError('Entity not found');
        }
        await Movie.findByIdAndDelete(id);
    }
}

export default new MovieService();