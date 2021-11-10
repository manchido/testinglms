import { lazy, Suspense } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'
const UserManagement = lazy(() => import('./UserManagement'))

const AdminPanel = () => {
    return(
        <Card className="mt-2 px-4 py-4 col-12">
            <CardTitle tag="h4" className="bold">
                Admin Panel
            </CardTitle>
            <Suspense fallback={<div>Loading...</div>}>
                <UserManagement />
            </Suspense>
        </Card>
    )
}

export default AdminPanel