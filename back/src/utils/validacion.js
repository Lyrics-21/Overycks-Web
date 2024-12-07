const zod = require('zod');
const rateLimiter = require('express-rate-limit');

const createUserSchema = zod.object
(
    {
        name: zod.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
        email: zod.string().email('Ingrese un email válido'),
        password: zod.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    }
);

const loginRateLimiter = rateLimiter(
    {
        windowsMs : 15 * 60 * 1000,
        max : 5,
        message : {status : 'error',
                   message : 'Demasiados intentos fallidos, intente mas tarde'}
    }
);


module.exports = {createUserSchema, loginRateLimiter};
