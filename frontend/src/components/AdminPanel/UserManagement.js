import React, { useEffect,useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import {checkTokenStatus} from '../../utils/common'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const UserManagement = () => {
    const [rowData, setRowData] = useState("");   
    const pagination = true;
    const paginationPageSize = 10;
    const [allUserData, setAllUserData] = useState([])
    
    const localUrl = "http://localhost:8001"
    const serverUrl = "http://172.105.51.160"
    
    useEffect(() => {
        getAllUser()
    },[])

    const getAllUser = async () =>{
        const nudgeToken = localStorage.getItem("nudgeToken")
        checkTokenStatus(nudgeToken);
        const url = `${process.env.REACT_APP_API_URL}/api/users/getall`

        
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
            <div className="ag-theme-alpine" style={{height: 400, width: "100%", marginTop: 10}}>
                <AgGridReact pagination={pagination} paginationPageSize={paginationPageSize}
                    rowData={allUserData}>
                    <AgGridColumn field="email"  filter={true}></AgGridColumn>
                    <AgGridColumn field="firstName"></AgGridColumn>
                    <AgGridColumn field="id"></AgGridColumn>
                </AgGridReact>
            </div>
            
        
        

    );
}

export default UserManagement