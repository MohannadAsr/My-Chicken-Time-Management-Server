// seeders/20240308123456-admin-user.js
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        name: 'SuperAdmin',
        code: '12345',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
