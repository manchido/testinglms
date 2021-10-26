module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        user_id: [{ type: Schema.Types.ObjectId, ref: 'user' }],
        question_id: [{ type: Schema.Types.ObjectId, ref: 'lmsquestion_answer' }],        
        answers:String,
        marks:Integer ,        
        status: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Lmsuser_answer_mark = mongoose.model("lmsuser_answer_mark", schema);
    return Lmsuser_answer_mark;
  };