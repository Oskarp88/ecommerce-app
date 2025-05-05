const { body } = require('express-validator');

exports.productCreateValidator = [
  body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio'),

  body('price')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),

  body('stock')
    .isInt({ min: 0 }).withMessage('El stock no puede ser negativo'),
];
