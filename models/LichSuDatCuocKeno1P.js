const mongoose = require("mongoose");

const lichSuDatCuocKeno1PSchema = new mongoose.Schema(
  {
    phien: {
      type: mongoose.Schema.ObjectId,
      ref: "GameKeno1P",
    },
    datCuoc: [
      {
        loaiBi: { type: String, enum: ["bi1", "bi2", "bi3", "bi4", "bi5"] },
        cuoc: [
          {
            loaiCuoc: {
              type: String,
              enum: ["T", "X", "C", "L"],
            },
            tienCuoc: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
    ],

    tinhTrang: {
      type: String,
      enum: ["dangCho", "dangQuay", "dangTraThuong", "hoanTat"],
      default: "dangCho",
    },
  },
  {
    collection: "LichSuDatCuocKeno1P",
    timestamps: true,
  }
);

const LichSuDatCuocKeno1P =
  mongoose.models.LichSuDatCuocKeno1P || mongoose.model("LichSuDatCuocKeno1P", lichSuDatCuocKeno1PSchema);
export default LichSuDatCuocKeno1P;
