import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true,
    },
    enroll: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin:{
      type: Boolean,
      default: false,
    },
   profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
    branch:String,
    exp:String,
    worked:String,
    year:String,
    bio:String,
    prev_companies:String
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
