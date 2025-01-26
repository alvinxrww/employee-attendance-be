'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING,
      allowNull: true, // Opsional
    });
    await queryInterface.addColumn('Users', 'phone', {
        type: Sequelize.STRING,
        allowNull: true,
    });
    await queryInterface.addColumn('Users', 'profile_photo_url', {
        type: Sequelize.STRING,
        allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'address');
    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.removeColumn('Users', 'profile_photo_url');
  }
};
