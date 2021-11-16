import { lazy, Suspense, useEffect, useState } from "react"
import { Card, CardTitle, Button, InputGroup, Input } from "reactstrap"

const Categories = lazy(() => import('./Categories'))
const Courses = lazy(() => import('./Courses'))
const Modules = lazy(() => import('./Modules'))
const ModuleMaterial = lazy(() => import('./ModuleMaterial'))

const Learn = () => {

    const [showCollapse, setShowCollapse] = useState(false)
    const [categorySelected, setCategorySelected] = useState(false)
    const [courseSelected, setCourseSelected] = useState(false)
    const [moduleSelected, setModuleSelected] = useState(false)

    const [categories, setCategories] = useState([])
    const [courses, setCourses] = useState([])
    const [modules, setModules] = useState([])

    const populateTestData = () => {
        setCategories([0,1,2,3,4,5,6])
        setCourses([0,1,2,3,4,5,6])
        setCategories([0,1,2,3,4])
        setModules([0,1,2,3,4,5])
    }

    return(
        <div className="mt-2 px-4 py-4 col-12">
            <h1 className="fw-bolder mb-4">Welcome To Nudge</h1>
            <div className="d-flex flex-wrap align-items-center mt-2 mb-2">
                <CardTitle tag="h4" className="bold col-10">
                    What do you need help with?
                </CardTitle>
                <InputGroup className="w-50 mt-2">
                    <Input placeholder="Search..."/>
                    <Button>
                        <i className="bi bi-search"></i>
                    </Button>
                </InputGroup>
                <Button color="info" className="ms-2 mt-2" onClick={() => populateTestData()}>Populate Test Data</Button>
            </div>
            {
                !courseSelected ?
                <div>
                    <h2 className="mb-3 mt-5 fw-bold">Please Select a Category</h2>
                    {
                        !categorySelected ? 
                        <div className="d-flex flex-row col-12" 
                            style={{overflowY: 'scroll'}}
                        >
                            {categories.map((idx) => {
                                return(
                                    <div className="col-3 me-2">
                                        <Suspense fallback={<div>Categories Loading...</div>}>
                                            <Categories setCategorySelected={setCategorySelected}/>
                                        </Suspense>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div className="d-flex flex-row col-12" 
                            style={{overflowY: 'scroll', fontSize: 12}}
                        >
                            {categories.map((idx) => {
                                return(
                                    <div className="col-2 me-2">
                                        <Suspense fallback={<div>Categories Loading...</div>}>
                                            <Categories categorySelected={categorySelected} setCategorySelected={setCategorySelected}/>
                                        </Suspense>
                                    </div>
                                )
                            })}
                        </div>
                    }

                    {
                        categorySelected && 
                        <div id="course">
                            <h2 className="mb-3 mt-5 fw-bold">Please Select a Course</h2>
                            <div className="d-flex flex-col col-12" style={{overflowY: 'scroll'}}>
                                {courses.map((idx) => {
                                    return(
                                        <div className="col-3 me-2 mb-3">
                                            <Suspense fallback={<div>Courses Loading...</div>}>
                                                <Courses courseSelected={courseSelected} setCourseSelected={setCourseSelected} />
                                            </Suspense>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
                :
                <div>
                    {
                        !moduleSelected ? 
                        <div>
                            <h2 className="mb-3 mt-5 fw-bold">Course Name</h2>
                            <div className="d-flex flex-col col-12" style={{overflowY: 'scroll'}}>
                                {modules.map((idx) => {
                                    return(
                                        <div className="col-3 me-2 mb-3">
                                            <Suspense fallback={<div>Modules Loading...</div>}>
                                                <Modules moduleSelected={moduleSelected} setModuleSelected={setModuleSelected} />
                                            </Suspense>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        :
                        <div>
                            <ModuleMaterial />
                        </div>
                    }
                </div>
            }


        </div>
    )
}

export default Learn