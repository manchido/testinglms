import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { getUserDetails, getNudgetoken } from '../../utils/common';

const UserBan = (props) => {
  const userStatus = props.valueFormatted ? props.valueFormatted : props.value;
  const [ban, Setban] = useState(false);
  const [unban, SetUnban] = useState(false);
  // const [userStatus, SetUserStatus] = useState('');
  if(userStatus === 1){
    Setban(true);
  }
  if(userStatus === 2){
    SetUnban(true);
  }
  

  const banUnbanClicked = async (status) => {
    const nudgeToken = getNudgetoken()   
    const formData = new FormData();
    formData.append('status', status);
    // formData.append('id', selectedUserId);
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
      //setEditData(false);
     
    }
    if (data.status === "error") {
      alert(data.msg);
      //setEditData(false);      
    }

  };

 


  return (
    <span>
      { ban && (<Button color="danger" onClick={() => banUnbanClicked('2')}> Ban </Button> ) }
      { unban && <Button color="danger" onClick={() => banUnbanClicked('1')}> UnBan </Button> }      
      
    </span>
  );
};

export default UserBan
