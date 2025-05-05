const { body } = require('express-validator');

exports.orderCreateValidator = [
  body('products')
    .isArray({ min: 1 }).withMessage('Debe haber al menos un producto en la orden'),

  body('total')
    .isFloat({ gt: 0 }).withMessage('El total debe ser mayor a 0'),
];
