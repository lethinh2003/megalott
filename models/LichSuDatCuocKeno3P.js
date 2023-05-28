const mongoose = require("mongoose");

const lichSuDatCuocKeno3PSchema = new mongoose.Schema(
  {
    phien: {
      type: mongoose.Schema.ObjectId,
      ref: "GameKeno3P",
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
    collection: "LichSuDatCuocKeno3P",
    timestamps: true,
  }
);

const LichSuDatCuocKeno3P =
  mongoose.models.LichSuDatCuocKeno3P || mongoose.model("LichSuDatCuocKeno3P", lichSuDatCuocKeno3PSchema);
export default LichSuDatCuocKeno3P;
