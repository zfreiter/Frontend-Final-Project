import User from '../models/User.js';

export const updateGroup = async (req, res) => {
  try {
    const { userId, groups } = req.body;
    let user = await User.findById(userId);

    const newGroup = user.stockGroups;
    newGroup.splice(0, groups.length, ...groups);
    user.set('stockGroups', newGroup);
    // user.stockGroups.splice(0, groups.length, ...groups);
    //const upDate = User.findByIdAndUpdate(userId, { stockGroups: groups }, { new: true });
    const upDate = await user.save();
    res.status(200).json(upDate);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
