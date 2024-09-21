'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Wishes', [ 
        {
          title: "Путешествие в Японию",
          description: "Хотелось бы посетить Токио и увидеть цветение сакуры.",
          deadLine: new Date('2024-04-01'),
          userId: 7,
          status: false
      },
      {
          title: "Изучить новый язык",
          description: "Начать изучение испанского языка для путешествий и общения.",
          deadLine: new Date('2024-12-31'),
          userId: 7,
          status: false
      },
      {
          title: "Купить велосипед",
          description: "Приобрести новый велосипед для активного отдыха и поездок по городу.",
          deadLine: new Date('2024-06-15'),
          userId: 7,
          status: false
      },
      {
          title: "Научиться играть на гитаре",
          description: "Записаться на курсы игры на гитаре и научиться играть любимые песни.",
          deadLine: new Date('2024-09-30'),
          userId: 7,
          status: false
      },
      {
          title: "Прочитать 20 книг в этом году",
          description: "Составить список книг и следить за прогрессом чтения.",
          deadLine: new Date('2024-12-31'),
          userId: 7,
          status: false
      }], {});
   
  },

  async down (queryInterface, Sequelize) {
   
     
     
      Example:
      await queryInterface.bulkDelete('Wishes', null, {});
  
  }
};
