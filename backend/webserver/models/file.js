module.exports = mongoose => {
    const File = mongoose.model(
      "file",
      mongoose.Schema(
        {
          subfolder: String,
          id: String,
          fileName: String,
          systemFileName:String,
          user: String,
        },
        { timestamps: true }
      )
    );
    return File;
  };