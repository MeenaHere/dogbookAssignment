import mongoose, { mongo } from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted._v;
  },
});

const dogSchema = new mongoose.Schema({
  name: String,
  nick: String,
  age: Number,
  bio: String,
  present: Boolean,
  friends: Array,
});

export default mongoose.model("Dog", dogSchema);
