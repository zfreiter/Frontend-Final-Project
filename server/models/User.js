import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 4,
    max: 30,
  },
  lastName: {
    type: String,
    required: true,
    min: 4,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    max: 30,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20,
  },
  stocksOwned: [{ name: String, amount: Number }],
  stockGroups: [[{ name: String }]],
});

const User = mongoose.model('User', UserSchema);
export default User;
