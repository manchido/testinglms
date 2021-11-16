import { lazy, Suspense, useState } from 'react'
import { Card, CardBody, CardTitle, Collapse, Button } from 'reactstrap'
const CourseManagement = lazy(() => import('./CourseManagement'))
const StudentManagement = lazy(() => import('./StudentManagement'))

const InstructorPanel = () => {
    const [showCourses, setShowCourses] = useState(false)
    const [showStudents, setShowStudents] = useState(false)

    return(
        <div className="px-4 py-4 col-12 border-bottom">
            <CardTitle tag="h2" className="fw-bold">
                Instructor Panel
            </CardTitle>
            <Card className="my-2 px-4 py-4 col-12">
                <div className="d-flex align-items-center">
                    <CardTitle tag="h4" className="bold col-8">
                        Course Management
                    </CardTitle>
                    <Button 
                        size="md" 
                        className="col-2 me-2"
                        color="primary"
                    >
                        + Add Course
                    </Button>
                    <Button 
                        size="md" 
                        className="col-2"
                        color="primary"
                        onClick={()=>setShowCourses(!showCourses)}
                    >
                        {showCourses ? "Hide Courses":"Show Courses"}
                    </Button>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    {showCourses && <CourseManagement />}
                </Suspense>
                <div className="d-flex align-items-center mt-3 border-top pt-3">
                    <CardTitle tag="h4" className="bold col-10">
                        Student Management
                    </CardTitle>
                    <Button 
                        size="md" 
                        className="col-2 ms-2"
                        color="primary"
                        onClick={()=>setShowStudents(!showStudents)}
                    >
                        {showStudents ? "Hide Students":"Show Students"}
                    </Button>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    {showStudents && <StudentManagement />}
                </Suspense>
            </Card>
        </div>
    )
}

export default InstructorPanel