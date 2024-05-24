const express = require('express');

const router = express.Router();
const TimeSlotsController = require('../controllers/timeSlotsController');
const UserController = require('../controllers/usersController');

router
  .route('/')
  .get(TimeSlotsController.getAllTimeSlots)
  .post(UserController.protectRoute, TimeSlotsController.createTimeSlot)
  .delete(UserController.protectRoute, TimeSlotsController.deleteTimeSlots);

router
  .route('/createTimeSlot')
  .post(UserController.protectRoute, TimeSlotsController.createAdminTimeSlot);

router
  .route('/updateTimeSlot')
  .post(UserController.protectRoute, TimeSlotsController.updateTimeSlot);

router
  .route('/getTimeSlot')
  .get(UserController.protectRoute, TimeSlotsController.findTimeSlot);

router
  .route('/endTimeSlot')
  .post(UserController.protectRoute, TimeSlotsController.endTimeSlot);

module.exports = router;
