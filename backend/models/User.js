import { ObjectId } from "mongodb";

export const createUser = ({ name, email, password }) => ({
  _id: new ObjectId(),
  name,
  email,
  password,
  createdAt: new Date()
});