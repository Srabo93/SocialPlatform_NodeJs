import { connect, ConnectOptions } from "mongoose";
import { MONGO_URI } from "./config"
const connectDB = async () => {
  try {
    await connect(
       MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions,
      () => console.log(`MongoDB Connected: success`)
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export default connectDB;
