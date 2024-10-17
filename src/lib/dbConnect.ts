import mongoose from "mongoose"

let connection: number;

const dbConnect = async () => {
    if (connection) {
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')
        connection = db.connections[0].readyState;
        console.log("Database connect successfully");

    } catch (error) {
        console.log("Database connection failed");
        console.log(error);
        process.exit(1);
    }
}

export default dbConnect;
