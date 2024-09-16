const mongoose=require('mongoose')

const propertySchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    location: { type: String, required: true },
    availableFrom: { type: Date, required: true },
    price: { type: Number },
    propertyType: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

const Property=mongoose.model('Property',propertySchema)

module.exports=Property