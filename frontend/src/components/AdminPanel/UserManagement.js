import React, { useEffect, useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { getNudgetoken } from '../../utils/common'
import { Button, FormGroup, Input } from 'reactstrap'
import UserEdit from './UserEdit'
import UserDelete from './UserDelete'
import UserBan from './UserBan'


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';




const UserManagement = () => {
    const [rowData, setRowData] = useState("");
    const pagination = true;
    const paginationPageSize = 10;
    const [allUserData, setAllUserData] = useState([])

    const localUrl = "http://localhost:8001"
    const serverUrl = "http://172.105.51.160"

    const EditRender = () => {
        return(
            <button>Edit</button>
        )
    }

    useEffect(() => {
        getAllUser()
    }, [])


    const selectTableRow = (params) => {
        return (
            '<Input id="selectid" name="selectid"  type="checkbox" value="' + params.value + '" />'
        )
    }

    const ChildMessageRenderer = props => {
        const banUnban = async (status) => {
            console.log(props.data.id);
            const nudgeToken = getNudgetoken()   
            const formData = new FormData();
            formData.append('status', status);
            formData.append('id', props.data.id);
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
        if(props.value === 1){
            return <span><Button color="danger" outline={true} size="sm" className="w-50" onClick={() => banUnban(2)}>Ban</Button></span>;
        }
        else{
            return <span><Button color="danger" outline={true} size="sm" className="w-50" onClick={() => banUnban(1)}>Unban</Button></span>;   
        }
    
        
    };

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
            frameworkComponents={{UserBan:UserBan, UserEdit: UserEdit, UserDelete:UserDelete ,childMessageRenderer: ChildMessageRenderer }}
            pagination={pagination} paginationPageSize={paginationPageSize}
                rowData={allUserData}>
                <AgGridColumn field="id" cellRenderer={selectTableRow}> 
                
                </AgGridColumn>
                <AgGridColumn field="email" filter={true}></AgGridColumn>
                <AgGridColumn field="firstName"></AgGridColumn>    
                <AgGridColumn field="role" filter={true}></AgGridColumn>                 
                <AgGridColumn  headerName="Ban/Unban" field="status" cellRenderer='childMessageRenderer' colId="params"/>           
                <AgGridColumn headerName="Edit" field="id" cellRenderer="UserEdit"></AgGridColumn>
                <AgGridColumn headerName="Delete" field="status" cellRenderer="UserDelete" ></AgGridColumn>

            </AgGridReact>
        </div>




    );
}

export default UserManagement