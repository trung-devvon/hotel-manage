'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hotels', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      star: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.FLOAT
      },
      destinationCode: {
        type: Sequelize.STRING
      },
      postedBy: {
        type: Sequelize.UUID
      },
      address: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.TEXT('long')
      },
      facilities: {
        type: Sequelize.TEXT('long')
      },
      lnglat: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT('long')
      },
      typeCode: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM(["ROOMS", "OUT_OF_ROOMS"]),
        defaultValue: "ROOMS",
      },
      name_normalized: {
        type: Sequelize.STRING
      },
      address_normalized: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('Hotels', ['name_normalized']);
    await queryInterface.addIndex('Hotels', ['address_normalized']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hotels');
  }
};