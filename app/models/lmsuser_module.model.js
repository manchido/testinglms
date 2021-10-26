module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        user_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
        module_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule' }],
        module_detail_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule_details' }],
        module_content_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule_details' }],          
        status: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Lmsuser_module = mongoose.model("lmsuser_module", schema);
    return Lmsuser_module;
  };