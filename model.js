//Require Mongoose
const mongoose = require("mongoose");

//Inisiasi Schema
const Schema = mongoose.Schema;

//Pembuatan Schema UserSchema
const UserSchema = new Schema({
  username: { type: String, required: true, },
  email: { type: String, required: true, },
  password: { type: String, required: true, },
  userid: { type: String, required: true }
});

const BioSchema = new Schema({
  tujuan_ideal: { type: String, enum: ['l', 'g'], required: true, },
  jenis_kelamin: { type: String, enum: ['l', 'p'], required: true, },
  ttl: { type: String, required: true, },
  tinggi_badan: { type: Number, required: true, },
  berat_badan: { type: Number, required: true, },
  tingkat_aktivitas: { type: String, enum: ['menetap', 'sedikit_aktif', 'cukup_aktif', 'sangat_aktif', 'ekstra_aktif'], required: true, },
  kecepatan_ideal: { type: String, enum: ['slow', 'normal', 'fast'], required: true, },
  profilepic : { type: String },
  userid: { type: String, required: true }
});

//Pembuatan Model atas Schema UserSchema
const User = mongoose.model("User", UserSchema, "Users");
const Bio = mongoose.model("Bio", BioSchema, "Biodata");

module.exports = {User, Bio};