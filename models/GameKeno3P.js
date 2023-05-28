const mongoose = require("mongoose");

const gameKeno3PSchema = new mongoose.Schema(
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
    collection: "GameKeno3P",
    timestamps: true,
  }
);
gameKeno3PSchema.pre("save", function (next) {
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

const GameKeno3P = mongoose.models.GameKeno3P || mongoose.model("GameKeno3P", gameKeno3PSchema);
export default GameKeno3P;
