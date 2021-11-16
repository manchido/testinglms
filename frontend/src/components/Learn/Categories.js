import React, { useState, lazy, Suspense } from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

const Categories = (props) => {

    const {setCategorySelected, categorySelected} = props
    
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
                <CardTitle tag={categorySelected ? "h4" : "h2"} className="fw-bold">
                    Card title
                </CardTitle>
                <CardText>
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </CardText>
                <Button size={categorySelected && "sm"} className="col-12" outline={true} color="primary" 
                    onClick={()=>setCategorySelected(true)}
                >
                    Start
                </Button>
                <CardSubtitle
                    className="mt-2 text-muted"
                >
                    {!categorySelected && "Upload Time"}
                </CardSubtitle>
                </CardBody>
            </Card>
            
        </div>
    )
}

export default Categories