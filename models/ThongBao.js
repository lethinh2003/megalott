import mongoose from "mongoose";

const thongBaoSchema = new mongoose.Schema(
  {
    nguoiDung: {
      type: mongoose.Schema.ObjectId,
      ref: "NguoiDung",
    },
    noiDung: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "ThongBao",
    timestamps: true,
  }
);

const ThongBao = mongoose.models.ThongBao || mongoose.model("ThongBao", thongBaoSchema);
export default ThongBao;
