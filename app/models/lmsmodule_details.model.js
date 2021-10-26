module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        module_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule' }],
        details_heading:String,       
        status: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Lmsmodule_details = mongoose.model("lmsmodule_details", schema);
    return Lmsmodule_details;
  };