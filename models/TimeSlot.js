const { DataTypes } = require('sequelize');
const Users = require('./Users');

module.exports = (sequelize) => {
  const UserModel = Users(sequelize);

  const TimeSlot = sequelize.define('TimeSlot', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  TimeSlot.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

  return TimeSlot;
};
