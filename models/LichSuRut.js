const mongoose = require("mongoose");

const lichSuRutSchema = new mongoose.Schema(
  {
    nguoiDuyet: {
      type: mongoose.Schema.ObjectId,
      ref: "NguoiDung",
    },
    soTien: {
      type: Number,
      default: 0,
    },
    nganHang: {
      type: mongoose.Schema.ObjectId,
      ref: "LienKetNganHang",
      trim: true,
      required: [true, "Vui lòng chọn ngân hàng cần rút"],
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
    collection: "LichSuRut",
    timestamps: true,
  }
);

const LichSuRut = mongoose.models.LichSuRut || mongoose.model("LichSuRut", lichSuRutSchema);
export default LichSuRut;
