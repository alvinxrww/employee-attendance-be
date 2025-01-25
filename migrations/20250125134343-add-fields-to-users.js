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
    await queryInterface.addColumn('Users', 'position', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'department', {
        type: Sequelize.STRING,
        allowNull: true,
    });
    await queryInterface.addColumn('Users', 'joined_at', {
        type: Sequelize.DATEONLY,
        allowNull: true,
    });
    await queryInterface.addColumn('Users', 'status', {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'position');
    await queryInterface.removeColumn('Users', 'department');
    await queryInterface.removeColumn('Users', 'joined_at');
    await queryInterface.removeColumn('Users', 'status');
  }
};
