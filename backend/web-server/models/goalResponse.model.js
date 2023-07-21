
module.exports = mongoose => {
    const Goal = mongoose.model(
      "goal-response",
      mongoose.Schema(
        {
            id: Number,
            goalId: String,
            success: Boolean,
            timeComplete: Date,
            duration: Number,
            madeTaskEasyText: String,
            madeTaskHardText: String,
            accomplishmentText: String,
            associatedImageIds: [String],
        },
        { timestamps: true }
      )
    );
    return Goal;
  };

