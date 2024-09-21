const { Wish } = require('../db/models');

class WishServices {
  static getAllWishes = async () => {
    try {
      const wishes = Wish.findAll();
      return wishes;
    } catch ({ message }) {
      return { stattus: 'error', message };
    }
  };

  static getOneWishByPk = async (id) => {
    const wish = Wish.findOne({where: {id}});
    if (wish) {
      return wish
    }
    return wish instanceof Wish;
  };

  static createWish = async ({
    title,
    description,
    status,
    deadLine,
    userId,
   
  }) => {
    try {
      const wish = await Wish.create({
        title,
        description,
        status,
        deadLine,
        userId,
   
      });

      return wish.get();
    } catch ({ message }) {
      return { stattus: 'error', message };
    }
  };

  static updateWish = async ( id, userId, data) => {
    const wish = await Wish.findOne({ where: { id , userId} });
    if (wish) {
      return wish.update(data);
    }
    return null;
  };

  static removeWish = async (id, userId) => {
    const wish = await Wish.findOne({ where: { id , userId} })
    if (wish) {
      return wish.destroy();
    }
    return null;
  };
}

module.exports = WishServices;
