const Property = require('../models/Property');

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching properties' });
  }
};

exports.addProperty = async (req, res) => {
    console.log(req.user)
  try {
    const newProperty = new Property({ ...req.body, owner: req.user.userId });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding property' });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProperty);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error updating property' });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Property.deleteOne({ _id: req.params.id });
    res.json( {message:"deleted successfully"});
  } catch (err) {
    console.error('Error deleting property:', err);
    res.status(500).json({ error: 'Error deleting property' });
  }
};

exports.myProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.userId });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching your properties' });
  }
};
