module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: String,
        email: String,
        firstName: String,
        lastName: String,
        password: String,
        phoneNumber:String,
        role:String,
        status:Number,        
        address: String,
        avatarUrl: String,
        avatarName: String,
        city: String,
        company: String,
        country: String ,   
        isVerified: Boolean,       
        state: String,     
        zipCode:String,
        studentManagement:Boolean,
        userManagement:Boolean,
        courseManagement:Boolean,    
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