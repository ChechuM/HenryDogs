const { Router } = require('express');
// Importar todos los routers;
const { dogRouter } = require('./dogRouter');
const { tempRouter } = require('./tempRouter');
const { errorRouter } = require('./errorRouter');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/', errorRouter)
router.use('/dogs', dogRouter)
router.use('/temperaments', tempRouter)

module.exports = router;
