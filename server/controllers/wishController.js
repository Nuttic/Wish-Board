
const WishServices = require("../services/WishServices");

exports.getWishes =  async (req, res) => {
  try {
    const wishes = await WishServices.getAllWishes();
    res.status(200).json({ message: "success", wishes });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}


exports.getOneWish = async (req, res) => {
  try {
    const { wishId } = req.params;
    const wish = await WishServices.getOneWishByPk(Number(wishId));
    if (character) {
      res.status(200).json({ message: "success", wish });
      return;
    } else {
      res.status(400).json({ error: "Wrong id of wish" });
    }
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

exports.createWish =  async (req, res) => {
  try {
    const {  
        title,
        description,
        status,
        deadLine,
    } = req.body

        console.log(Object.keys(res.locals));
        const {id: userId} = res.locals.user
        
      if(title.trim() !== '' && description.trim() !== '' && deadLine.trim() !== '' && status){
       

        const wish = await WishServices.createWish({   
            title,
            description,
            status,
            deadLine,
            userId,})
         
 res.status(201).json({message: 'success', wish})
      }
               
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

exports.updateWish =  async (req, res) => {

  try {
    const { wishId } = req.params;
    const {   
        title,
        description,
        status,
        deadLine,
        } = req.body;

      
        const { id: userId } = res.locals.user;
    if(title.trim() !== '' && description.trim() !== '' && deadLine.trim() !== '' && status){
      const wish = await WishServices.updateWish(+wishId, userId, {
        title,
        description,
        status,
        deadLine,
        userId,
    });

    res.status(200).json({ message: "success", wish });
    }
   
    
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

exports.deleteWish = async (req, res) => {
  try {
    const { wishId } = req.params;
    const { id: userId } = res.locals.user;
    console.log(userId);
    

    const wish = await WishServices.removeWish(Number(wishId), userId);
    if (wish) {
      res.status(200).json({ message: "success", wish });
    }
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
}

