import { Schema, model } from 'mongoose';

interface IGenre {
    name: string;
}

const Genre = model<IGenre>('Genre', new Schema<IGenre>({
    name: {
        type: String,
        required: true,
        unique: true
    }
}));

export default Genre;