const mongoose = require("mongoose");

const gameKeno1PSchema = new mongoose.Schema(
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
    collection: "GameKeno1P",
    timestamps: true,
  }
);
gameKeno1PSchema.pre("save", function (next) {
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

const GameKeno1P = mongoose.models.GameKeno1P || mongoose.model("GameKeno1P", gameKeno1PSchema);
export default GameKeno1P;
