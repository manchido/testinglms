module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: String,        
        password: String,       
        status:Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Apiuser = mongoose.model("apiusers", schema);
    return Apiuser;
  };