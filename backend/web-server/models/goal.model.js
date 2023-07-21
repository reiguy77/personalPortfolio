module.exports = mongoose => {
    const Goal = mongoose.model(
      "goal",
      mongoose.Schema(
        {
          title: String,
          task: String,
          frequency: String,
          duration: Number,
          why: String,
          startDate: Date,
          endDate: Date, 
          active: Boolean,
          hobby: String,
        },
        { timestamps: true }
      )
    );
    return Goal;
  };