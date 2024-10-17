import mongoose, { Document, Schema } from "mongoose";

export interface Complain extends Document {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
}

const ComplainSchema: Schema<Complain> = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
})

const ComplainModel = mongoose.models.Complain as mongoose.Model<Complain> || mongoose.model("Complain", ComplainSchema);

export default ComplainModel;
