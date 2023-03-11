import { connect, ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    await connect(
       process.env.MONGO_URI,
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
