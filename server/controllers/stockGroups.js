import User from '../models/User.js';

export const updateGroup = async (req, res) => {
  try {
    const { userId, groups } = req.body;

    const upDate = await User.findByIdAndUpdate(userId, { stockGroups: groups }, { new: true });

    res.status(200).json(upDate);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
