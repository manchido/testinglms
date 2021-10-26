module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        module_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule' }],
        module_detail_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule_details' }],
        content_heading:String,
        content:String,
        attachment:String,       
        status: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Lmsmodule_content = mongoose.model("lmsmodule_content", schema);
    return Lmsmodule_content;
  };