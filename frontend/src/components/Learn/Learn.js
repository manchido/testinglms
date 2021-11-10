import { lazy, Suspense, useState } from "react"
import { Card, CardTitle, Button } from "reactstrap"

const Learn = () => {
    const [showCollapse, setShowCollapse] = useState(false)

    return(
        <div className="mt-2 px-4 py-4 col-12">
            <CardTitle tag="h3" className="bold">
                Student Panel
            </CardTitle>
            <Card className="my-2 px-4 py-4 col-12">
                <div className="d-flex align-items-center">
                    <CardTitle tag="h4" className="bold col-10">
                        Courses
                    </CardTitle>
                </div>
            </Card>
        </div>
    )
}

export default Learn