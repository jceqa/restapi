import { mongooseDB } from "../../common/services/mongoose.service.js";

const userSchema = mongooseDB.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
});

const User = mongooseDB.model('Users', userSchema);
export default User;
