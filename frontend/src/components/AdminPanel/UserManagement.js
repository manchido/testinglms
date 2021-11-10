import React, { useEffect,useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const UserManagement = () => {
    const [allUserData, setAllUserData] = useState([])

    useEffect(() => {
        getAllUser()
    },[])

    const getAllUser = async () =>{
        const nudgeToken = localStorage.getItem("nudgeToken")
        const localUrl = "http://localhost:8001"
        const url = localUrl + '/api/users/getall'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'x-access-token': nudgeToken},
            
        }
        const response = await fetch(url, requestOptions)
        const data = await response.json();
        if(data.status === "success") {
            console.log("getAllUser",data.data);
            setAllUserData(data.data)
        }
        else if(data.status === "error") {
            console.log("No record");
        }
    
    };
    
    return (
        <div className="ag-theme-alpine" style={{height: 400, width: "100%", marginTop: "10px"}}>
            <AgGridReact
                rowData={allUserData}>
                <AgGridColumn field="email"></AgGridColumn>
                <AgGridColumn field="firstName"></AgGridColumn>
                <AgGridColumn field="id"></AgGridColumn>
            </AgGridReact>
        </div>
    );
}

export default UserManagement