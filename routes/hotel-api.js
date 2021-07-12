const express = require('express');
const { v4: uuidv4 } = require('uuid');

const bookings = require('../bookings.json');

const router = express.Router();

//Create A Booking
router.post('/', (req, res) => {
    const memberModel = {
        id: uuidv4(),
        roomId:	uuidv4(),
        title: req.body.title,
        firstName: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate
    }

    if (!memberModel) {
        return res.status(400).json({msg: "Body is invalid, please provide data for whole model"}) //This could be a bug
    }

    bookings.push(memberModel);
    res.json(memberModel);

});

//Read All Bookings
router.get('/', (req, res) => {
    res.json(bookings);
});

//Read A Specific Booking By ID
router.get('/:id', (req, res) => {
    const found = bookings.some(booking => booking.id === parseInt(req.params.id));

    if (found) {
        res.json(bookings.filter(booking => booking.id === parseInt(req.params.id)))
    }

    else {
        res.status(400).json({msg: `Could not find the specified user with id of ${req.params.id}`})
    }
});

//Delete Specified Booking
router.delete('/:id', (req, res) => {
    const found = bookings.some(booking => booking.id === parseInt(req.params.id));

    if (found) {
        res.json({msg: `booking with the id of ${req.params.id} is deleted`, bookings: bookings.filter(booking => booking.id !== parseInt(req.params.id))})
    }

    else {
        res.status(400).json({msg: `Could not find the specified user with id of ${req.params.id}`})
    }
});

module.exports = router;
