const mongoose = require("mongoose");

const lichSuDatCuocKeno5PSchema = new mongoose.Schema(
  {
    phien: {
      type: mongoose.Schema.ObjectId,
      ref: "GameKeno5P",
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
    collection: "LichSuDatCuocKeno5P",
    timestamps: true,
  }
);

const LichSuDatCuocKeno5P =
  mongoose.models.LichSuDatCuocKeno5P || mongoose.model("LichSuDatCuocKeno5P", lichSuDatCuocKeno5PSchema);
export default LichSuDatCuocKeno5P;
