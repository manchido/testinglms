module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        user_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
        module_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule' }],
        module_detail_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule_details' }],
        module_content_id: [{ type: Schema.Types.ObjectId, ref: 'lmsmodule_details' }],
        Plan_date:Timestamp,         
        status: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Lms_planner = mongoose.model("lms_planner", schema);
    return Lms_planner;
  };