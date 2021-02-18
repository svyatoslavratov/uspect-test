import mongoose from "mongoose";
import crypto from "crypto";

import { IUser } from "interfaces/IUser";
import { hashPassword, verifyPassword } from "utils/auth";

export enum UserRoles {
  user = "user",
  admin = "admin"
}

const User = new mongoose.Schema<IUser & mongoose.Document>(
  {
    email: {
      type: String,
      required: [true, "Please enter your email address"],
      lowercase: true,
      unique: true,
      index: true,
      validate: {
        validator: (v: string) =>
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            v
          ),
        message: "Invalid email."
      }
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String
    },
    role: {
      type: String,
      enum: UserRoles,
      default: UserRoles.user,
      required: true
    }
  },
  { timestamps: true }
);

User.index({ name: "text" });

User.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = crypto.randomBytes(16).toString("hex");
  try {
    const hash = await hashPassword(this.password, salt);
    if (hash) {
      this.password = hash;
      this.salt = salt;
    }
  } catch (err) {
    return next(err);
  }
});

User.methods.comparePassword = async function (candidatePassword: string) {
  try {
    const res = await verifyPassword(
      candidatePassword,
      this.password,
      this.salt
    );
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export default mongoose.model<IUser & mongoose.Document>("users", User);
