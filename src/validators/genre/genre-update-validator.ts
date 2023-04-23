import { body, validationResult } from 'express-validator';
import Genre from '../../models/genre';

const genreUpdateValidator = [
    body('name').custom((value, { req }) => {
        const errors = validationResult(req).array();
        const nameIsInvalid = errors.find((e) => e.param === 'name');
        if(nameIsInvalid) {
            return Promise.resolve();
        }
        return Genre.findOne({ name: value })
            .then((genre) => {
                if(genre && genre._id.toString() !== req.params?.id) {
                    return Promise.reject('Name already register');
                }
                return Promise.resolve();
            })
    })
]   

export default genreUpdateValidator;