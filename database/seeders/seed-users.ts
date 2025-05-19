import mongoose from "mongoose";
import { User } from "../models/index.models";
import connectDB from "../db-connect";
import config from "../../src/config/config";

interface IUser {
  username: string;
  password: string;
  role: string;
}

const users: IUser[] = [
  {
    username: "admin",
    password: "admin123",
    role: "Admin",
  },
  {
    username: "reviewer",
    password: "reviewer123",
    role: "Reviewer",
  },
];

const isExistUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const isExist = await User.findOne({ username: user.username });
    return isExist;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const seed = async (users: IUser[]): Promise<void> => {
  for (const user of users) {
    if (!(await isExistUser(user))) {
      await User.create(user);
    } else {
      console.log(`${user.username} already exists`);
    }
  }
};

const main = async (): Promise<void> => {
  try {
    const arg = process.argv[2];
    console.log(`${arg.toUpperCase()} Running..`);
    connectDB(config.MONGO_DB_URI); // connect to DB

    if (arg === "seed") {
      await seed(users);
      console.log("Users seeded successfully");
    } else if (arg === "drop") {
      await User.deleteMany({});
      console.log("All users deleted successfully");
    } else {
      console.log("Invalid argument");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1); // exit with failure
  } finally {
    await mongoose.disconnect(); // make sure connection closes
    process.exit(0); // success (only reached if no unhandled errors)
  }
};

// start the seeding process
main();
