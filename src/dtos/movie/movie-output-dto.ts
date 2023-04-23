import GenreOutputDTO from "../genre/genre-output-dto"

type MovieOutputDTO = {
    id: string;
    title: string;
    synopsis: string;
    genre: GenreOutputDTO;
}

export default MovieOutputDTO;