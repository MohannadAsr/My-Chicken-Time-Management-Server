const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'worker'),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // isNumeric: false,
        len: [5, 5], // E
      },
    },
  });

  return Users;
};
