import Feedback from "../models/Feedback.js";

const addFeedback = async (req, res) => {
  try {
    const { id, email, discription } = req?.body;
    const { image } = req?.file;
    if (!id || !email || !discription || !image)
      return res.status(404).json({ message: "Data is missing" });
    await Feedback.create({ userId: id, email, discription, image });
    return res.status(200).json({ message: "Feedback added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
const deleteFeedback = async (req, res) => {
  try {
    const { _id } = req?.body;
    if (!_id) return res.status(404).json({ message: "Data is missing" });
    await Feedback.deleteOne({ _id });
    return res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const { _id, discription } = req?.body;
    if (!_id) return res.status(404).json({ message: "Data is missing" });
    await Feedback.findByIdAndUpdate(
      _id,
      { discription },
      { new: true }
    ).exec();
    return res.status(200).json({ message: "Feedback updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const allFeedback = await Feedback.find({});
    return res.status(200).json(allFeedback);
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};

export { addFeedback, deleteFeedback, updateFeedback, getAllFeedback };
