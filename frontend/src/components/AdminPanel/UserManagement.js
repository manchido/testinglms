import React, { useEffect,useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';



const UserManagement = () => {
    const [rowData, setRowData] = useState("");

    useEffect(()=>{
        let res = getUser();
        setRowData(res);
    }, [])

    const getUser = async () =>{

        const localUrl = "http://localhost:8001"
        const url = localUrl + '/api/users/getall'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjE4YjliOGYyNGYwNjc4MzlkN2NkMTRiIiwiZW1haWwiOiJsaW01QGdtYWlsLmNvbSIsImlhdCI6MTYzNjU0NzM2NCwiZXhwIjoxNjM2NTU0NTY0fQ.TKJC7yXxg40g8qx-RMijk9UbYxQ8D4rd0ue6gvid5Ac'},
            
        }
        const response = await fetch(url, requestOptions)
        const data = await response.json();
        if(data.status === "success") {
            console.log(data.data);
            return data.data;
            
        }
        else if(data.status === "error") {
            console.log("No record");
        }
    
    };

    
    return (
        <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="email"></AgGridColumn>
                <AgGridColumn field="firstName"></AgGridColumn>
                <AgGridColumn field="id"></AgGridColumn>
            </AgGridReact>
        </div>
    );
}

export default UserManagement