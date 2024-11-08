"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GeneralRules", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      timeGetRoomStart: {
        type: Sequelize.FLOAT,
      },
      timeGetRoomEnd: {
        type: Sequelize.FLOAT,
      },
      timeLeftRoomStart: {
        type: Sequelize.FLOAT,
      },
      timeLeftRoomEnd: {
        type: Sequelize.FLOAT,
      },
      childrenAndBed: {
        type: Sequelize.TEXT("long"),
      },
      ageRetriction: {
        type: Sequelize.INTEGER,
      },
      pets: {
        type: Sequelize.ENUM(["ENABLE", "DISABLE"]),
        defaultValue: "DISABLE",
      },
      cashOnly: {
        type: Sequelize.TEXT("long"),
      },
      hotelId: {
        type: Sequelize.UUID,
      },
      cancellation: {
        type: Sequelize.TEXT("long"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("GeneralRules");
  },
};
