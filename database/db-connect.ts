import { connect } from "mongoose";

/**
 * Establishes a connection to a MongoDB database
 *
 * @param {string} URI - The MongoDB connection URI
 *
 * @returns {Promise<void>} A promise that resolves when the connection is
 * established, or rejects if there is an error
 */
const connectDB = async (URI: string): Promise<void> => {
  try {
    const conn = await connect(URI);
    console.log(
      `DB connected: ${conn.connection.host} - ${conn.connection.name}`
    );
  } catch (err) {
    if (err instanceof Error) {
      console.log(`DB failed to connect: ${err.name} | ${err.message}`);
    } else {
      console.log("An unknown error occurred while connecting to the DB.");
    }
    process.exit(1);
  }
};

export default connectDB;
