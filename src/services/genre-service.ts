import GenreInputDTO from "../dtos/genre/genre-input-dto";
import GenreOutputDTO from "../dtos/genre/genre-output-dto";
import Genre from "../models/genre";
import Movie from "../models/movie";
import EntityNotFoundError from '../errors/entity-not-found-error';
import BadRequestError from "../errors/bas-request-error";


class GenreService {

    public async save(inputDTO: GenreInputDTO): Promise<GenreOutputDTO> {
        const genre = new Genre({ name: inputDTO.name });
        await genre.save();
        console.log('genre', genre);
        return {
            id: genre._id.toString(),
            name: genre.name
        }
    }

    public async findById(id: string): Promise<GenreOutputDTO> {
        const genre = await Genre.findById(id);
        if(!genre) {
            throw new EntityNotFoundError('Genre not found');
        }
        return {
            id: genre._id.toString(),
            name: genre.name
        }
    }

    public async findAll(): Promise<Array<GenreOutputDTO>> {
        const genres = await Genre.find();
        return genres.map((genre) => ({ 
            id: genre._id.toString(),
            name: genre.name
         }));
    }

    public async update(inputDTO: GenreInputDTO, id: string): Promise<GenreOutputDTO> {
        const genre = await Genre.findById(id);
        if(!genre) {
            throw new EntityNotFoundError('Genre not found');
        }
        await Genre.findByIdAndUpdate(id, {
            name: inputDTO.name
        });
        return this.findById(id);
    }

    public async deleteById(id: string): Promise<void> {
        const genre = await Genre.findById(id);
        if(!genre) {
            throw new EntityNotFoundError('Genre not found');
        }
        const movie = await Movie.findOne({
            genre: genre._id
        })
        if(movie) {
            throw new BadRequestError('Genre cannot be deleted');
        }
        await Genre.findByIdAndDelete(id);
    }
}

export default new GenreService();