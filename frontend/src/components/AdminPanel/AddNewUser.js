import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../../utils/common';
import Dropzone from "react-dropzone";
import { Button, Modal, ModalFooter, Form, FormGroup, Label, Input, ModalHeader, ModalBody } from "reactstrap"




export default (props) => {
  const selectedUserId = props.valueFormatted ? props.valueFormatted : props.value; 
  const [addNew, setAddNew] = useState(true);
  const [avatarUpload, setAvatarUpload] = useState(false);
  const [existingAvatar, setexistingAvatar] = useState(true);
  const [avatarFile, setAvatarFile] = useState('');
  const [password, firstName] = useState('');  

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    if(avatarFile.length){
      avatarFile.forEach(file => URL.revokeObjectURL(file.preview));
    }
    
  }, [avatarFile]);

  const buttonClicked = () => {
    // alert(`${cellValue} medals won!`);
    getUserDetails(selectedUserId).then(result => {
      console.log(result);     
      // setEditData(result);
    })

  };

  const closeModal = () => {
     setAddNew(false);
  }

  const handleLogin = async (event) => {
    event.preventDefault()   
    console.log('id ==',event.target.id.value)
    const mailString = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(\.([a-zA-Z0-9]+))+$/
    const email = event.target.email.value
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const phoneNumber = event.target.phoneNumber.value
    const role = event.target.role.value
    const password = event.target.password.value
    

    const formData = new FormData();
    
    if(!mailString.test(email)) {
      alert("Please Enter Valid Email ID")
      return false
    }
    if(firstName === ''){
      alert("Please Enter Valid First name")
      return false
    }
    if(lastName === ''){
      alert("Please Enter Valid Last name")
      return false
    }
      
    if(phoneNumber === ''){
      alert("Please Enter Valid phone number")
      return false
    }
    if(role === ''){
      alert("Please select valid Role")
      return false
    }

    if(avatarFile.length){
      formData.append('avatarFile', avatarFile[0]); 
    }else{
      alert("Please profile image")
      return false 
    }    
   
    formData.append('email', email);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);    
    formData.append('phoneNumber', phoneNumber);
    formData.append('role', role);    

    if(password !== ''){
      formData.append('password', password);
    } 
    
    
    const url = `${process.env.REACT_APP_API_URL}/api/users/create`            
    const requestOptions = {
        //headers: { 'Content-Type': 'application/json' },  
        method: 'POST',      
        body: formData
    }
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    console.log(data);
    if(data.status === "success") {
      alert(data.msg);
      window.location.reload();
    }
    if(data.status === "error") {
      alert(data.msg);
      //window.location.reload();
    }

  };

  const changeAvatar = () =>{
    setAvatarUpload(true);
    setexistingAvatar(false);
  }

  const updateFormData = (e) =>{
    console.log(e.target.name);    
    setAddNew({[e.target.name]: e.target.value});  
  }



  const handleDrop = (acceptedFiles) =>{
    console.log('aa: ',acceptedFiles);    
    setAvatarFile(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));

  }

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
 

  return (  
    <span>
      { addNew && <Modal isOpen={true}  modalTransition={{ timeout: 2000 }}>
          <ModalHeader close={<button className="close"  onClick={() => closeModal()}>×</button>}>
            Edit User
          </ModalHeader>
          <Form onSubmit={(e) => handleLogin(e)} >
        <ModalBody>        
          
            <FormGroup>
              <Label for="exampleEmail">
                Firstname
              </Label>
              <Input
                text
                id="firstName"
                name="firstName"
                value={addNew.firstName}               
                onChange = {(e) => updateFormData(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">
                Lastname
              </Label>
              <Input
                text
                id="lastName"
                name="lastName"
                value={addNew.lastName}
                onChange = {(e) => updateFormData(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={addNew.email}                
                onChange = {(e) => updateFormData(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="password placeholder"
                type="password"
                value={addNew.password} 
                onChange = {(e) => updateFormData(e)}
              />
              
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                phoneNumber
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="phonenumber"
                type="text"
                value={addNew.phoneNumber} 
                onChange = {(e) => updateFormData(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                Role
              </Label>
              <Input
                id="role"
                name="role"
                type="select" 
                value={addNew.role}               
                onChange = {(e) => updateFormData(e)}
              >
                <option value='admin'>
                  Admin
                </option>
                <option value='manager'>
                  Manager
                </option>
                <option value='instructor'>
                  Instructor
                </option>
                <option value='student'>
                  Student
                </option>

              </Input>
            </FormGroup>
            

           <FormGroup>
              <Label for="examplePassword">
                Select Profile Image
              </Label>


              <Dropzone onDrop={(e) => handleDrop(e)}
        
        accept="image/*"
        minSize={1024}
        maxSize={3072000}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag'n'drop images, or click to select files</p>
          </div>
        )}
      </Dropzone>

      {avatarFile && <div>{avatarFile.map((file) => <img style={thumb} src={file.preview} /> )}</div> }
             
          
            </FormGroup> 

         </ModalBody>
        <ModalFooter>
        <Button color="success"  type="submit">Submit</Button>
         {' '}
      <Button className="close" onClick={() => closeModal()}>
        Cancel
      </Button>
    </ModalFooter>  
    </Form>    


      </Modal> 
    }
    </span>  
   
  );
};