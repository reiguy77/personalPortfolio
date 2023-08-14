
module.exports = mongoose => {
    const UserImage = mongoose.model(
      "imageCategory",
      mongoose.Schema(
        {
            categoryName: String,
            user: String,
            subfolder: String
        },
        { timestamps: true }
      )
    );
    return UserImage;
  };

