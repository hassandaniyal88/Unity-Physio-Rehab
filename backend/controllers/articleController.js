const Article = require("../models/Article");

exports.listPublic = async (req, res) => {
  const items = await Article.find({ published: true }).sort({ createdAt: -1 });
  res.json(items);
};

exports.getById = async (req, res) => {
  const item = await Article.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

exports.create = async (req, res) => {
  const { title, body, tags, published } = req.body;
  const item = await Article.create({ title, body, tags, published, author: req.user._id });
  res.status(201).json(item);
};

exports.update = async (req, res) => {
  const { title, body, tags, published } = req.body;
  const item = await Article.findByIdAndUpdate(req.params.id, { title, body, tags, published }, { new: true });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

exports.remove = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};


