import mongoose from "mongoose";

const lienKetNganHangSchema = new mongoose.Schema(
  {
    tenNganHang: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Vui lòng nhập tên ngân hàng"],
    },
    tenChuTaiKhoan: {
      type: String,
      trim: true,
      required: [true, "Vui lòng nhập tên chủ tài khoản"],
    },
    soTaiKhoan: {
      type: String,
      trim: true,
      required: [true, "Vui lòng nhập tên số tài khoản"],
    },
  },
  {
    collection: "LienKetNganHang",
    timestamps: true,
  }
);

const LienKetNganHang = mongoose.models.LienKetNganHang || mongoose.model("LienKetNganHang", lienKetNganHangSchema);
export default LienKetNganHang;
