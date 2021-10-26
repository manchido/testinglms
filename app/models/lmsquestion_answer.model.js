module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        module_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule' }],
        module_detail_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule_details' }],
        module_content_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule_details' }],
        question:String,
        option:Object,
        answer:String,  
        status: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Lmsquestion_answer = mongoose.model("lmsquestion_answer", schema);
    return Lmsquestion_answer;
  };