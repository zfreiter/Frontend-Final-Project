import User from '../models/User.js';

export const updateOwned = async (req, res) => {
  try {
    const { userId, owned } = req.body;

    const upDate = await User.findByIdAndUpdate(userId, { stocksOwned: owned }, { new: true });
    upDate.password = undefined;

    res.status(200).json(upDate);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
