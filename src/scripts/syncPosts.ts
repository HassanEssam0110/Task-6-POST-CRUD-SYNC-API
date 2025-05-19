import axios from "axios";
import connectDB from "../../database/db-connect";
import config from "../config/config";
import { IPost, Post } from "../../database/models/index.models";
const { MONGO_DB_URI, POSTS_API } = config;

const syncPosts = async () => {
  try {
    /* Connect to the database */
    await connectDB(MONGO_DB_URI);
    console.log("Syncing posts...");

    // 1. Fetch posts from API
    const { data: postsFromAPI } = await axios.get(POSTS_API);

    // 2. Insert posts into DB
    let counter = 0;
    for (let i = 0; i < postsFromAPI.length; i++) {
      const post = postsFromAPI[i];
      const existingPost: IPost | null = await Post.findOne({
        originalId: post.id,
      });

      if (!existingPost) {
        await Post.create({
          originalId: post.id,
          title: post.title,
          body: post.body,
        });
        counter++;
      }
    }

    if (counter > 0) {
      console.log(`Inserted ${counter} new posts.`);
    } else {
      console.log("No new posts to insert.");
    }

    console.log("Sync complete.");
    process.exit(1);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("❌ Axios error:", err.message);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response data:", err.response.data);
      }
    } else {
      console.error("❌ Unexpected error:", err);
    }
    process.exit(1);
  }
};

syncPosts();
