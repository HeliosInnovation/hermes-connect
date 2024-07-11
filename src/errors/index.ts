import { generalErrors } from './general';
import { httpErrors } from './http';

const errors = { ...httpErrors, ...generalErrors };

export default errors as Record<number | string, string>;
