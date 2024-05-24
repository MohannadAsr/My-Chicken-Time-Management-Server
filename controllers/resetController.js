const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { TimeSlot, Users } = require('../models'); // Adjust the path accordingly
const { getaccessToken } = require('./usersController');

exports.resetDatabase = catchAsync(async (req, res) => {
  const admin = await Users.findOne({ where: { role: 'admin' } });
  // Use the destroy method with the transaction option

  // await Users.destroy({ where: {}, truncate: false });
  // await Products.destroy({ where: {}, truncate: false });
  await TimeSlot.destroy({ where: {}, truncate: false });

  res.json({ status: 200, message: 'done' });
});
