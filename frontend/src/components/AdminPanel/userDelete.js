import React from 'react';
import { Button } from 'reactstrap';
import { getNudgetoken } from '../../utils/common'

const UserDelete = (props) => {
  const selectedUserId = props.valueFormatted ? props.valueFormatted : props.value;
  const nudgeToken = getNudgetoken()

  const deleteUser = async () => {
   
      
    console.log('nudgeToken : ',nudgeToken);
 
    
    const url = `${process.env.REACT_APP_API_URL}/api/users/${selectedUserId}`            
    const requestOptions = {      
        method: 'delete', 
        headers: {          
          'x-access-token': nudgeToken
        },      
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

  return (
    <span>     
      <Button color="danger" size="sm" outline={true} className="w-50" onClick={() => deleteUser()}>Delete</Button>
    </span>
  );
};

export default UserDelete