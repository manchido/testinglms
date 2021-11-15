import React, { useEffect, useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { getNudgetoken } from '../../utils/common'
import { FormGroup, Input } from 'reactstrap'
import UserEdit from './userEdit'
import UserDelete from './userDelete'

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
    }, [])


    const selectTableRow = (params) => {
        return (
            '<Input id="selectid" name="selectid"  type="checkbox" value="' + params.value + '" />'
        )
    }

    const getAllUser = async () => {
        const nudgeToken = getNudgetoken()
        const url = `${process.env.REACT_APP_API_URL}/api/users/getall`

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': nudgeToken
            },

        }
        const response = await fetch(url, requestOptions)
        const data = await response.json();
        if (data.status === "success") {
            console.log("getAllUser", data.data);
            setAllUserData(data.data)
        }
        else if (data.status === "error") {
            console.log("No record");
        }

    };

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginTop: 10 }}>
            <AgGridReact 
            frameworkComponents={{   userEdit: UserEdit, userDelete:UserDelete  }}
            pagination={pagination} paginationPageSize={paginationPageSize}
                rowData={allUserData}>
                <AgGridColumn field="id" cellRenderer={selectTableRow}>

                </AgGridColumn>
                <AgGridColumn field="email" filter={true}></AgGridColumn>
                <AgGridColumn field="firstName"></AgGridColumn>
                <AgGridColumn headerName="Edit" field="id" cellRenderer="userEdit" ></AgGridColumn>
                <AgGridColumn headerName="Delete" field="id" cellRenderer="userDelete" ></AgGridColumn>

            </AgGridReact>
        </div>




    );
}

export default UserManagement