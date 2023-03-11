import { connect, ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    await connect(
      // process.env.MONGO_URI,
      "mongodb+srv://Armin:TellTale1962@cluster0.qelcv.mongodb.net/TellTale?retryWrites=true&w=majority",
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
