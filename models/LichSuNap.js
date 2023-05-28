const mongoose = require("mongoose");

const lichSuNapSchema = new mongoose.Schema(
  {
    nguoiDuyet: {
      type: mongoose.Schema.ObjectId,
      ref: "NguoiDung",
    },
    soTien: {
      type: Number,
      default: 0,
    },
    tinhTrang: {
      type: String,
      enum: ["dangCho", "hoanTat"],
      default: "dangCho",
    },
    noiDungPhanHoi: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "LichSuNap",
    timestamps: true,
  }
);

const LichSuNap = mongoose.models.LichSuNap || mongoose.model("LichSuNap", lichSuNapSchema);
export default LichSuNap;
