import React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

const Modules = (props) => {

    const {setModuleSelected, moduleSelected} = props

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
                    <CardTitle tag="h2" className="fw-bold">
                        Module Title & Description
                    </CardTitle>
                    <Button className="col-12" outline={true} color="primary" onClick={() => setModuleSelected(true)}>
                        Start
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default Modules