const mongoose = require("mongoose");

const gameKeno5PSchema = new mongoose.Schema(
  {
    phien: {
      type: Number,
    },
    ketQua: [
      {
        type: Number,
      },
    ],
    tinhTrang: {
      type: String,
      enum: ["dangCho", "dangQuay", "dangTraThuong", "hoanTat"],
      default: "dangCho",
    },
  },
  {
    collection: "GameKeno5P",
    timestamps: true,
  }
);
gameKeno5PSchema.pre("save", function (next) {
  if (this.isNew) {
    this.constructor
      .find({})
      .sort({ phien: -1 })
      .limit(1)
      .then((result) => {
        this.phien = result.length === 0 ? 1 : Number(result[0].phien) + 1;
        next();
      });
  } else {
    next();
  }
});

const GameKeno5P = mongoose.models.GameKeno5P || mongoose.model("GameKeno5P", gameKeno5PSchema);
export default GameKeno5P;
