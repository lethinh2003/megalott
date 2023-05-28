const mongoose = require("mongoose");

const bienDongSoDuSchema = new mongoose.Schema(
  {
    nguoiDung: {
      type: mongoose.Schema.ObjectId,
      ref: "NguoiDung",
    },
    tienTruoc: {
      type: Number,
      default: 0,
    },
    tienSau: {
      type: Number,
      default: 0,
    },
    noiDung: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "BienDongSoDu",
    timestamps: true,
  }
);

const BienDongSoDu = mongoose.models.BienDongSoDu || mongoose.model("BienDongSoDu", bienDongSoDuSchema);
export default BienDongSoDu;
