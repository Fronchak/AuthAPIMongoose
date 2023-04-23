import { Schema, model } from 'mongoose';

interface IUser {
    email: string;
    password: string;
    roles: Array<number>
}

const User = model<IUser>('User', new Schema<IUser>({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [Number],
        required: true
    }
}));

export default User;