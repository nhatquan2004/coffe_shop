import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type:String,
    required:true
  },
  people:{
    type:Number,
    required:true
  },
  message:{
    type:String,
    required:true
  }
},{timestamps:true});

const TableModel = mongoose.model("tables",TableSchema)
export default TableModel
