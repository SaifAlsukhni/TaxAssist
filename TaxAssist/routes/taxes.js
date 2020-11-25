const express = require('express');
const router = express.Router();
const {taxesController} = require("../controllers/taxes-controller");

router.get('/add', async (req, res, next) => {
    await taxesController.add(req, res, next)
})

router.post('/save', async (req, res, next) => {
    await taxesController.save(req, res, next)
})

router.get('/view', async (req, res, next) => {
    await taxesController.view(req, res, next)
})

router.get('/edit', async (req, res, next) => {
    await taxesController.edit(req, res, next)
})

router.get('/destroy', async (req, res, next) => {
    await taxesController.destroy(req, res, next)
})

router.get('/all', async function(req, res, next) {
    await taxesController.all(req, res, next)
})

router.get('/calendar', async function(req, res, next) {
    await taxesController.calendar(req, res, next)
})

router.get('/quick', async function(req, res, next) {
    await taxesController.quick(req, res, next)
})

module.exports = router;