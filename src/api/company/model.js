import {Schema, model } from 'mongoose';

const companySchema = new Schema({
    Name:String,
    Countries:[String],
    NumberOfWorkers:Number,
    TypeOfProducts:String,

});

const Company = model("Company", companySchema);

export default Company;