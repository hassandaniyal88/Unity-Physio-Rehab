const Review = require("../models/Review");
const Doctor = require("../models/Doctor");

exports.create = async (req, res) => {
  const { doctorId, rating, comment } = req.body;
  const review = await Review.create({ doctor: doctorId, patient: req.user._id, rating, comment });
  // Update doctor's average
  const [agg] = await Review.aggregate([
    { $match: { doctor: review.doctor } },
    { $group: { _id: "$doctor", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
  ]);
  if (agg) {
    await Doctor.findOneAndUpdate({ user: review.doctor }, { averageRating: agg.avg, numReviews: agg.count });
  }
  res.status(201).json(review);
};

exports.listForDoctor = async (req, res) => {
  const items = await Review.find({ doctor: req.params.doctorId }).populate("patient", "name").sort({ createdAt: -1 });
  res.json(items);
};


