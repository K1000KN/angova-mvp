import mongoose from "mongoose";

const { Schema } = mongoose;

const RefreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "7d", // Optionnel : expire le document après 7 jours
    },
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

export default RefreshToken;
