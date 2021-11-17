import React, { useState, useEffect } from 'react';
import { getUserDetails, getNudgetoken } from '../../utils/common';
import Dropzone from "react-dropzone";
import { Row, Col,Button, Modal, ModalFooter, Form, FormGroup, Label, Input, ModalHeader, ModalBody } from "reactstrap"




export default (props) => {
  const selectedUserId = props.valueFormatted ? props.valueFormatted : props.value;
  const [editData, setEditData] = useState('');
  const [avatarUpload, setAvatarUpload] = useState(false);
  const [existingAvatar, setexistingAvatar] = useState(true);
  const [avatarFile, setAvatarFile] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    if (avatarFile.length) {
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

  const closeModal = () => {
    setEditData(false);
  }

  const handleLogin = async (event) => {
    const nudgeToken = getNudgetoken()
    event.preventDefault()
    console.log('id ==', event.target.id.value)
    const mailString = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(\.([a-zA-Z0-9]+))+$/
    const email = event.target.email.value
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const phoneNumber = event.target.phoneNumber.value
    const role = event.target.role.value
    const password = event.target.password.value
    const studentManagement = event.target.studentManagement.checked
    const userManagement = event.target.userManagement.checked
    const courseManagement = event.target.courseManagement.checked    
   
    const formData = new FormData();

    if (!mailString.test(email)) {
      alert("Please Enter Valid Email ID")
      return false
    }
    if (firstName === '') {
      alert("Please Enter Valid First name")
      return false
    }
    if (lastName === '') {
      alert("Please Enter Valid Last name")
      return false
    }
    
    if (phoneNumber === '') {
      alert("Please Enter Valid phone number")
      return false
    }
    if (role === '') {
      alert("Please select valid Role")
      return false
    }
    if (avatarFile.length) {
      formData.append('avatarFile', avatarFile[0]);
    }
    formData.append('id', event.target.id.value);
    formData.append('email', email);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);   
    formData.append('phoneNumber', phoneNumber);
    formData.append('role', role);
    formData.append('studentManagement', studentManagement);
    formData.append('userManagement', userManagement);
    formData.append('courseManagement', courseManagement);
    formData.append('fromAdmin', true);
    

    if (password !== '') {
       formData.append('password', password);
    }

    const url = `${process.env.REACT_APP_API_URL}/api/users/update`
    const requestOptions = {
      headers: {
        'x-access-token': nudgeToken
      },
      method: 'POST',
      body: formData
    }
    const response = await fetch(url, requestOptions)
    const data = await response.json()
    console.log(data);
    if (data.status === "success") {
      alert(data.msg);
      setEditData(false);
     
    }
    if (data.status === "error") {
      alert(data.msg);
      //setEditData(false);      
    }

  };

  const changeAvatar = () => {
    setAvatarUpload(true);
    setexistingAvatar(false);
  }

  const updateFormData = (e) => {
    console.log(e.target.name);
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else {
      setEditData({ [e.target.name]: e.target.value });
    }

  }



  const handleDrop = (acceptedFiles) => {
    console.log('aa: ', acceptedFiles);
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
      {editData && <div >
        <Modal isOpen={true} fullscreen="xl" style={{ display: 'block', maxWidth: 800 }}         modalTransition={{ timeout: 2000 }}>
          <ModalHeader close={<button className="close" onClick={() => closeModal()}>×</button>}>
            Edit User
          </ModalHeader>
          <Form onSubmit={(e) => handleLogin(e)}>
            <ModalBody>


              <input type="hidden" name="id" value="id" value={editData.id} />
              
              <FormGroup row>
              <Col sm={6}>
                <Label for="exampleEmail">
                  Firstname
                </Label>
                <Input
                  text
                  id="firstName"
                  name="firstName"
                  value={editData.firstName}
                  onChange={(e) => updateFormData(e)}
                />
                </Col>
                 <Col sm={6}>
                <Label for="exampleEmail">
                  Lastname
                </Label>
                <Input
                  text
                  id="lastName"
                  name="lastName"
                  value={editData.lastName}
                  onChange={(e) => updateFormData(e)}
                />
                </Col>
              </FormGroup>
              
              <FormGroup row>
              <Col sm={6}>
                <Label for="exampleEmail">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="with a placeholder"
                  type="email"
                  value={editData.email}
                  onChange={(e) => updateFormData(e)}
                />
                </Col>
             <Col sm={6}>
                <Label for="examplePassword">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="password placeholder"
                  type="password"
                  value={password}
                  onChange={(e) => updateFormData(e)}
                />
                <span style={{ fontSize: '12px', color: 'red' }}>If you enter password then select as new password , otherwise maintain old password.</span>
                </Col>
              </FormGroup>
              <FormGroup row>
              <Col sm={6}>
                <Label for="examplePassword">
                  phoneNumber
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="phonenumber"
                  type="text"
                  value={editData.phoneNumber}
                  onChange={(e) => updateFormData(e)}
                />
                </Col>
               <Col sm={6}>
                <Label for="examplePassword">
                  Role
                </Label>
                <Input
                  id="role"
                  name="role"
                  type="select"
                  value={editData.role}
                  onChange={(e) => updateFormData(e)}
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
                </Col>
              </FormGroup>
              {existingAvatar && <FormGroup row>
                <Col sm={6}>
                <Label for="examplePassword">
                  Profile Picture
                </Label>
                
                <div className="d-flex justify-content-center align-items-center">
                  <img className="me-2 mt-3" src={editData.avatarUrl} alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
                </div>

                <div>
                  <Button color="primary" onClick={() => changeAvatar()}>
                    Change
                  </Button>
                </div>
                </Col>
              </FormGroup>}

              {avatarUpload && <FormGroup row>
                <Col sm={6}>
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

                {avatarFile && <div>{avatarFile.map((file) => <img style={thumb} src={file.preview} />)}</div>}
                 </Col>      
              </FormGroup>}

              <Label for="examplePassword">
                  User visibilty setting
                </Label> 
                <br/>
              <FormGroup check inline >
                <Input type="checkbox" name='userManagement' id='userManagement' trueValue="yes" falseValue="no"  checked={ editData.userManagement && true }
                  />
                <Label check>
                  User Management
                </Label>
              </FormGroup>
              <FormGroup check inline >
                <Input type="checkbox" name='courseManagement' id='courseManagement' trueValue="yes" falseValue="no" defaultChecked={ editData.courseManagement && true }/>
                <Label check>
                  Course Management
                </Label>
              </FormGroup>

              <FormGroup check inline >
                <Input type="checkbox" name='studentManagement' id='studentManagement' trueValue="yes" falseValue="no" defaultChecked={ editData.studentManagement && true }/>
                <Label check>
                  Student Management
                </Label>
              </FormGroup>


            </ModalBody>
            <ModalFooter>
              <Button color="success" type="submit">Submit</Button>
              {' '}
              <Button className="close" onClick={() => closeModal()}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>


        </Modal>
      </div>}
      <button onClick={() => buttonClicked()}>Edit</button>

    </span>
  );
};