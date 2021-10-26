module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        module_name: String,        
        status: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Lmsmodule = mongoose.model("lmsmodule", schema);
    return Lmsmodule;
  };