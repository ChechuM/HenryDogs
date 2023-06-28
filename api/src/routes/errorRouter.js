const { Router } = require('express');
const errorRouter = Router();
// const img = require('./412.jpg')

errorRouter.get('/', (req, res) => {
    // let errorImg = img;
    res.status(200).json('This is an error')
})