import User from '../models/User.js';

export const updateOwned = async (req, res) => {
  try {
    const { userId, owned } = req.body;
    let user = await User.findById(userId);

    const newOwned = user.stocksOwned;
    newOwned.splice(0, owned.length, ...owned);
    user.set('stocksOwned', newOwned);

    //const upDate = User.findByIdAndUpdate(userId, { stocksOwned: newOwned }, { new: true });
    const upDate = await user.save();
    res.status(200).json(upDate);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
