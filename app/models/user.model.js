module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: String,
        email: String,
        firstname: String,
        lastname: String,
        password: String,
        phone:String,
        role:String,
        status:Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("users", schema);
    return User;
  };