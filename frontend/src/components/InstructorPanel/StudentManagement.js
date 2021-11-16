import React, { useEffect,useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const StudentManagement = () => {
    const [rowData, setRowData] = useState("");   
    const pagination = true;
    const paginationPageSize = 10;
    const [allUserData, setAllUserData] = useState([])
    
    const localUrl = "http://localhost:8001"
    const serverUrl = "http://172.105.51.160"
    
    useEffect(() => {
        // getAllUser()
    },[])

    const getAllUser = async () =>{
        const nudgeToken = localStorage.getItem("nudgeToken")
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
            <div className="ag-theme-alpine" style={{height: 400, width: "100%", marginTop: 10}}>
                <AgGridReact pagination={pagination} paginationPageSize={paginationPageSize}
                    rowData={allUserData}>
                    <AgGridColumn field="id"  filter={true}></AgGridColumn>
                    <AgGridColumn field="name"></AgGridColumn>
                    <AgGridColumn field="email"></AgGridColumn>
                    <AgGridColumn field="courses"></AgGridColumn>
                    <AgGridColumn field="edit"></AgGridColumn>
                    <AgGridColumn field="delete"></AgGridColumn>
                </AgGridReact>
            </div>
            
        
        

    );
}

export default StudentManagement