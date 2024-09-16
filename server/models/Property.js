const mongoose=require('mongoose')

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    availableFrom: { type: Date, required: true },
    price: { type: Number, required: true },
    propertyType: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  });

const Property=mongoose.model('Property',propertySchema)

module.exports=Property