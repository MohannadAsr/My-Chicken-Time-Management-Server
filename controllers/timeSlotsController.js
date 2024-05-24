const { Op, where } = require('sequelize');
const { TimeSlot, Users } = require('../models');
const catchAsync = require('../utils/catchAsync');
const { getPaginatedResults } = require('../utils/Pagination');
const { query } = require('express');
const WhereClauseFilter = require('../utils/WhereClauseFilter');
const FilterFn = require('../utils/FilterFn');

exports.createAdminTimeSlot = catchAsync(async (req, res, next) => {
  const timeSlot = await TimeSlot.create({
    ...req.body,
  });

  res.status(200).json({ data: timeSlot });
});
exports.createTimeSlot = catchAsync(async (req, res, next) => {
  const timeSlot = await TimeSlot.create({
    ...req.body,
    startTime: new Date().toISOString(),
    endTime: null,
    userId: req.user.id,
  });

  res.status(200).json({ data: timeSlot });
});

exports.endTimeSlot = catchAsync(async (req, res, next) => {
  const timeSlot = await TimeSlot.update(
    {
      ...req.body,
      endTime: new Date().toISOString(),
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );

  res.status(200).json({ data: timeSlot });
});

exports.getAllTimeSlots = catchAsync(async (req, res, next) => {
  const Clausewhere = [
    { key: 'userId', value: req.query.userId },
    { key: 'startDate', value: req.query.startDate },
    { key: 'endDate', value: req.query.endDate },
  ];

  const allTimeSlots = await getPaginatedResults(
    req,
    TimeSlot,
    FilterFn(WhereClauseFilter(req, Clausewhere)),
    {
      include: [{ model: Users, as: 'user' }],
      order: [['updatedAt', 'DESC']],
    }
  );

  // const allTimeSlots = await TimeSlot.findAll({
  //   include: [{ model: Users, as: 'user' }],
  //   order: [['updatedAt', 'DESC']],
  // });

  res.status(200).json({ data: allTimeSlots });
});

exports.findTimeSlot = catchAsync(async (req, res, next) => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();

  // Check if Already Have in Progress One
  const findAlreadyActivatedTimeSlot = await TimeSlot.findOne({
    where: {
      userId: req.user.id,
      startTime: {
        [Op.ne]: null,
      },
      endTime: {
        [Op.eq]: null,
      },
    },
  });

  if (findAlreadyActivatedTimeSlot)
    return res.status(200).json({ data: findAlreadyActivatedTimeSlot });

  const userTimeSlotForToday = await TimeSlot.findOne({
    where: {
      createdAt: { [Op.gt]: TODAY_START, [Op.lt]: NOW },
      userId: req.user.id,
    },
    include: [{ model: Users, as: 'user' }],
  });

  res.status(200).json({ data: userTimeSlotForToday });
});

exports.updateTimeSlot = catchAsync(async (req, res, next) => {
  const updatedTimeSlot = await TimeSlot.update(req.body, {
    where: { id: req.body.id },
  });

  res.status(200).json({ data: updatedTimeSlot });
});

exports.deleteTimeSlots = catchAsync(async (req, res, next) => {
  await TimeSlot.destroy({
    where: { id: req.body.id },
  });

  res.status(200).json({ message: 'deleted Successfully' });
});
