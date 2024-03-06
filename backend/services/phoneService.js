const Phone = require('../models/phones');

exports.getAllPhones = async () => {
  return await Phone.findAll();
};

exports.getPhoneById = async (id) => {
  return await Phone.findByPk(id);
};

exports.createPhone = async (PhoneData) => {
  if (Array.isArray(PhoneData)) {
    for (let item of PhoneData) {
      let { name, brand, model, data } = item;
      for (let detail of data) {
        let { price, color } = detail;
        await Phone.create({ name, brand, model, price, color });
      }
    }
  } else if ('details' in PhoneData) {
    let { name, details, price } = PhoneData;
    let { brand, model, color } = details;
    await Phone.create({ name, brand, model, price, color });
  } else {
    await Phone.create(PhoneData);
  }
};

exports.updatePhone = async (id, updatedPhoneData) => {
  try {
    const phone = await Phone.findByPk(id);
    if (!phone) {
      throw new Error('Phone not found');
    }
    Object.keys(updatedPhoneData).forEach(key => {
      phone[key] = updatedPhoneData[key];
    });
    await phone.save();
  } catch (err) {
    throw err;
  }
};

exports.deletePhone = async (id) => {
  return await Phone.destroy({ where: { id: id } });
};