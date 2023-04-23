import { Schema, model, Types } from 'mongoose';

export interface IMovie {
    title: string,
    synopsis: string,
    genre: Types.ObjectId
}

const Movie = model<IMovie>('Movie', new Schema<IMovie>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    synopsis: {
        type: String,
        required: true
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }
}));

export default Movie;