'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    
    await queryInterface.bulkInsert('users', [{
      name: 'User1',
      email: 'user1@gmail.com',
      password: '123',
      role: 'Employee',
      created_by: '11',
      updated_by: '11',
      deleted_at: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'User2',
      email: 'user2@gmail.com',
      password: '123',
      role: 'Employee',
      created_by: '12',
      updated_by: '12',
      deleted_at: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'User3',
      email: 'user3@gmail.com',
      password: '123',
      role: 'Employee',
      created_by: '13',
      updated_by: '13',
      deleted_at: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'User4',
      email: 'user4@gmail.com',
      password: '123',
      role: 'Employee',
      created_by: '14',
      updated_by: '14',
      deleted_at: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
