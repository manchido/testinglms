import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../../utils/common';
import Dropzone from "react-dropzone";
import { Button, Modal, ModalFooter, Form, FormGroup, Label, Input, ModalHeader, ModalBody } from "reactstrap"




export default (props) => {
  const selectedUserId = props.valueFormatted ? props.valueFormatted : props.value; 
  const [editData, setEditData] = useState('');
  const [avatarUpload, setAvatarUpload] = useState(false);
  const [existingAvatar, setexistingAvatar] = useState(true);
  const [avatarFile, setAvatarFile] = useState('');

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
      setEditData(result);
    })

  };

  const handleLogin = (event,id) => {
    event.preventDefault()   
    console.log(event.target.firstName.value)
    const mailString = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(\.([a-zA-Z0-9]+))+$/
    const email = event.target.email.value
    const firstName = event.target.firstName.value
    const lastName = event.target.email.value
    const phoneNumber = event.target.phoneNumber.value
    const role = event.target.role.value
    
    if(!mailString.test(email)) {
      alert("Please Enter Valid Email ID")
      return false
    }   
  };

  const changeAvatar = () =>{
    setAvatarUpload(true);
    setexistingAvatar(false);
  }

  const onDrop = (files) =>{
    if (files.length > 0) {
      setAvatarFile(files);      
    }
  }

  const handleDrop = (acceptedFiles) =>{
    console.log('aa: ',acceptedFiles);
    setAvatarFile(acceptedFiles); 
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
      {editData && <Modal isOpen={true}

        modalTransition={{ timeout: 2000 }}>
        <ModalBody>

          <Form onSubmit={(e) => handleLogin(e,editData.id)} >
            <FormGroup>
              <Label for="exampleEmail">
                Firstname
              </Label>
              <Input
                text
                id="firstName"
                name="firstName"
                value={editData.firstName}
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
                value={editData.lastName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="with a placeholder"
                type="email"
                value={editData.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="password placeholder"
                type="password"
                value={editData.password}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                phoneNumber
              </Label>
              <Input
                id="phonenumber"
                name="phonenumber"
                placeholder="phonenumber"
                type="text"
                value={editData.phoneNumber}
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
            { existingAvatar && <FormGroup>
              
               <div className="d-flex justify-content-center align-items-center">
                <img className="me-2 mt-3" src={editData.avatarUrl} alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
              </div> 

              <div>
                <Button color="primary" onClick={() => changeAvatar()}>
                  Change
                </Button>
              </div>
            </FormGroup> }

            { avatarUpload && <FormGroup>
              <Label for="examplePassword">
                File Upload
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
             
            

              { /* <!--<Input
                id="avatarUrl"
                name="avatarUrl"
                type="file"
              /> */ }
            </FormGroup> }

           
            <div>
            <Button color="success"  type="submit">Submit</Button>
              </div>
            

          </Form>


        </ModalBody>
      </Modal>}
      <button onClick={() => buttonClicked()}>Edit</button>
    </span>
  );
};