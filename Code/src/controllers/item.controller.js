import Item from "../models/Item.js";


export const createItem = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    const item = await Item.create({
      name,
      price,
      quantity,
      description,
      userId: req.user.id, 
    });

    res.status(201).json({
      message: "Item created",
      item,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const { keyword } = req.query;

    let query = { userId: req.user.id };

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    const items = await Item.find(query).sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, price, quantity, description },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({
      message: "Item updated",
      item,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};











export const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};