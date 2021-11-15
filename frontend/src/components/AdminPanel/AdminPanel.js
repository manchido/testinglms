import { lazy, Suspense, useState } from 'react'
import { Card, CardBody, CardTitle, Collapse, Button } from 'reactstrap'
const UserManagement = lazy(() => import('./UserManagement'))
const AddNewUser = lazy(() => import('./AddNewUser'))

const AdminPanel = () => {
    const [showCollapse, setShowCollapse] = useState(false)    
    const [addNewUser, setAddNewUser] = useState(false);
   

    return(
        <div className="mt-2 px-4 py-4 col-12">
            <CardTitle tag="h3" className="bold">
                Admin Panel
            </CardTitle>
            <Card className="my-2 px-4 py-4 col-12">
                <div className="d-flex align-items-center">
                    <CardTitle tag="h4" className="bold col-8">
                        User Management
                    </CardTitle>
                    <Button 
                        size="md" 
                        className="col-2"
                        color="primary"
                        onClick={()=>setAddNewUser(!addNewUser)}
                    >
                       Add New User
                    </Button>
                    <Button 
                        size="md" 
                        className="col-2"
                        color="primary"
                        onClick={()=>setShowCollapse(!showCollapse)}
                    >
                        {showCollapse ? "Hide Users":"Show Users"}
                    </Button>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    {addNewUser && <AddNewUser />}
                    {showCollapse && <UserManagement />}
                </Suspense>
            </Card>
        </div>
    )
}

export default AdminPanel