import React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

const Courses = (props) => {

    const {setCourseSelected, courseSelected} = props

    return(
        <div>
            <Card>
                <div className="p-1">
                    <CardImg
                        alt="Card image cap"
                        src="https://picsum.photos/318/180"
                        top
                    />
                </div>
                <CardBody>
                <a href="#" className="text-decoration-none" onClick={() => setCourseSelected(true)}>
                    <CardTitle tag="h2" className="fw-bold">
                        Course Title & Description
                    </CardTitle>
                </a>
                </CardBody>
            </Card>
        </div>
    )
}

export default Courses