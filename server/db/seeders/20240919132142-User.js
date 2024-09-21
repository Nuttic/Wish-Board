'use strict';

const bcrypt = require('bcrypt')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Users', [ {
      name: "Иван Иванов",
      email: "ivan.ivanov@example.com",
      password: await bcrypt.hash("password123",10),
     
  },
  {
      name: "Мария Петрова",
      email: "maria.petrova@example.com",
      password: await bcrypt.hash("password456",10),
     
  },
  {
      name: "Сергей Смирнов",
      email: "sergey.smirnov@example.com",
      password: await bcrypt.hash("password789",10),
     
  },
  {
      name: "Анна Кузнецова",
      email: "anna.kuznetsova@example.com",
      password: await bcrypt.hash("password321",10),
    
  },
  {
      name: "Дмитрий Васильев",
      email: "dmitry.vasiliev@example.com",
      password: await bcrypt.hash("password654",10),
    
  },
  {
      name: "Елена Сидорова",
      email: "elena.sidorova@example.com",
      password: await bcrypt.hash("password987",10),
     
  },
  {
    name: "Anna",
    email: "n@t",
    password: await bcrypt.hash("7",10),
  
}], {});
 
},

async down (queryInterface, Sequelize) {
 
    await queryInterface.bulkDelete('Users', null, {});
  
}
};
