const { body } = require('express-validator');

exports.registerValidator = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('email')
    .isEmail().withMessage('Debes ingresar un email válido'),

  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres'),
];

exports.loginValidator = [
  body('email')
    .isEmail().withMessage('Debes ingresar un email válido'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
];
