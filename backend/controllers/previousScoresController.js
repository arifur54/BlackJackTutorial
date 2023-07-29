const PreviousScores = require('../models/previousScores.model');

// saves the score into database.
const saveResult = async (req, res) => {
  try {
    const { user_id, result, winningCards } = req.body;
    console.log(user_id, result, winningCards)
    const playedAt = new Date();
    
    const previousScores = new PreviousScores({
      user_id,
      result,
      winningCards,
      playedAt,
    });

    await previousScores.save();
    res.status(201).json({ message: 'Result saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// gets all the result. (not implement for current version of the application)
const getResults = async (req, res) => {
  try {
    const previousScores = await PreviousScores.find();

    res.status(200).json(previousScores);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// gets result based on userId from database
const getResultsByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const previousScores = await PreviousScores.find({ user_id });

    res.status(200).json(previousScores);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// deletes Result based on ResultID
const deleteResultById = async (req, res) => {
  try {
    const id = req.params._id;
   
    const deletedResult = await PreviousScores.findByIdAndDelete(id);

    res.status(200).json({ data: deletedResult,  msg: "Delete Result Successfully!"});
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

module.exports = {
  saveResult,
  getResults,
  getResultsByUserId,
  deleteResultById
};