const phoneService = require('../services/phoneService');

exports.getAllPhones = async (req, res) => {
  try {
    const phones = await phoneService.getAllPhones();
    res.json(phones);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getPhoneById = async (req, res) => {
  try {
    const phone = await phoneService.getPhoneById(req.params.id);
    res.json(phone);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createPhone = async (req, res) => {
  const PhoneData = req.body;
  try {
    if (Array.isArray(PhoneData)) {
      for (let item of PhoneData) {
        let { name, brand, model, data } = item;
        for (let detail of data) {
          let { price, color } = detail;
          if (!name || !brand || !model || !price || !color) {
            return res.status(400).send('All fields are required');
          }
          await phoneService.createPhone({ name, brand, model, price, color });
        }
      }
    } else if ('details' in PhoneData) {
      let { name, details, price } = PhoneData;
      let { brand, model, color } = details;
      if (!name || !brand || !model || !price || !color) {
        return res.status(400).send('All fields are required');
      }
      await phoneService.createPhone({ name, brand, model, price, color });
    } else {
      let { name, brand, model, price, color } = PhoneData;
      if (!name || !brand || !model || !price || !color) {
        return res.status(400).send('All fields are required');
      }
      await phoneService.createPhone({ name, brand, model, price, color });
    }
    res.status(201).send('Phone(s) created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updatePhone = async (req, res) => {
  const PhoneData = req.body;
  try {
    let updateData = {};

    if ('details' in PhoneData) {
      let { name, details, price } = PhoneData;
      let { brand, model, color } = details;
      updateData = { name, brand, model, price, color };
    } else {
      let { name, brand, model, price, color } = PhoneData;
      updateData = { name, brand, model, price, color };
    }

    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).send('No fields to update');
    }

    await phoneService.updatePhone(req.params.id, updateData);
    res.status(200).send('Phone updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deletePhone = async (req, res) => {
  try {
    await phoneService.deletePhone(req.params.id);
    res.status(200).send('Phone deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};