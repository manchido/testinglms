import React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

const ModuleMaterial = (props) => {

    const {setModuleMaterialelected, moduleMaterialelected} = props

    return(
        <div>
            <h1 className="fs-2 fw-bold mt-5 mb-3 ms-1">Module Name</h1>
            <div className="d-flex col-12">
                    <Card className="col-3 m-1">
                        <CardBody>
                            <CardTitle tag="h2">Module #1</CardTitle>
                            <section className="mb-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptate animi saepe ducimus eum natus excepturi ex architecto quos odio, magnam suscipit dolorem, quibusdam cupiditate quae aut ipsam consequatur quidem?
                            </section>
                            <Button className="mt-2">Click Here</Button>
                        </CardBody>
                    </Card>
                    <Card className="col-9 m-1">
                        <CardBody>
                            <CardTitle tag="h2">Module #2</CardTitle>
                            <section className="mb-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni libero quae nihil, ab, laborum cupiditate commodi facilis asperiores nobis excepturi, voluptatibus quas. Voluptatem sed dicta ea itaque eaque quasi repellendus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt tenetur saepe facilis sapiente consectetur, vel vitae cum. Quidem quae placeat asperiores delectus adipisci libero a repellat, laboriosam perferendis, ut accusamus.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae provident? Debitis fuga quas modi. Optio, mollitia! Aliquid tempora qui ab quisquam harum dignissimos eaque ea nulla magni iure! Voluptas.
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet unde beatae assumenda, quisquam est, laborum reiciendis quod praesentium necessitatibus dolorum obcaecati ut, veniam officia minus error. Quo unde eum in.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptate animi saepe ducimus eum natus excepturi ex architecto quos odio, magnam suscipit dolorem, quibusdam cupiditate quae aut ipsam consequatur quidem?
                            </section>
                        </CardBody>
                    </Card>
            </div>
            <div className="d-flex col-12">
                <Card className="col-6 m-1">
                    <CardBody>
                        <CardTitle tag="h2">Module #3</CardTitle>
                        <section className="mb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni libero quae nihil, ab, laborum cupiditate commodi facilis asperiores nobis excepturi, voluptatibus quas. Voluptatem sed dicta ea itaque eaque quasi repellendus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt tenetur saepe facilis sapiente consectetur, vel vitae cum. Quidem quae placeat asperiores delectus adipisci libero a repellat, laboriosam perferendis, ut accusamus.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae provident? Debitis fuga quas modi. Optio, mollitia! Aliquid tempora qui ab quisquam harum dignissimos eaque ea nulla magni iure! Voluptas.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptate animi saepe ducimus eum natus excepturi ex architecto quos odio, magnam suscipit dolorem, quibusdam cupiditate quae aut ipsam consequatur quidem?
                        </section>
                    </CardBody>
                </Card>
                <Card className="col-6 m-1">
                    <CardBody>
                        <CardTitle tag="h2">Module #4</CardTitle>
                        <section className="mb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni libero quae nihil, ab, laborum cupiditate commodi facilis asperiores nobis excepturi, voluptatibus quas. Voluptatem sed dicta ea itaque eaque quasi repellendus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt tenetur saepe facilis sapiente consectetur, vel vitae cum. Quidem quae placeat asperiores delectus adipisci libero a repellat, laboriosam perferendis, ut accusamus.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae provident? Debitis fuga quas modi. Optio, mollitia! Aliquid tempora qui ab quisquam harum dignissimos eaque ea nulla magni iure! Voluptas.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptate animi saepe ducimus eum natus excepturi ex architecto quos odio, magnam suscipit dolorem, quibusdam cupiditate quae aut ipsam consequatur quidem?
                        </section>
                        <Button className="mt-2">Click Here</Button>
                    </CardBody>
                </Card>
            </div>
            <div className="d-flex col-12">
                <Card className="col-5 m-1">
                    <CardBody>
                        <CardTitle tag="h2">Module #5</CardTitle>
                        <section className="mb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni libero quae nihil, ab, laborum cupiditate commodi facilis asperiores nobis excepturi, voluptatibus quas. Voluptatem sed dicta ea itaque eaque quasi repellendus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt tenetur saepe facilis sapiente consectetur, vel vitae cum. Quidem quae placeat asperiores delectus adipisci libero a repellat, laboriosam perferendis, ut accusamus.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae provident? Debitis fuga quas modi. Optio, mollitia! Aliquid tempora qui ab quisquam harum dignissimos eaque ea nulla magni iure! Voluptas.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptate animi saepe ducimus eum natus excepturi ex architecto quos odio, magnam suscipit dolorem, quibusdam cupiditate quae aut ipsam consequatur quidem?
                        </section>
                    </CardBody>
                </Card>
                <Card className="col-7 m-1">
                    <CardBody>
                        <CardTitle tag="h2">Module #6</CardTitle>
                        <section className="mb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni libero quae nihil, ab, laborum cupiditate commodi facilis asperiores nobis excepturi, voluptatibus quas. Voluptatem sed dicta ea itaque eaque quasi repellendus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt tenetur saepe facilis sapiente consectetur, vel vitae cum. Quidem quae placeat asperiores delectus adipisci libero a repellat, laboriosam perferendis, ut accusamus.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae provident? Debitis fuga quas modi. Optio, mollitia! Aliquid tempora qui ab quisquam harum dignissimos eaque ea nulla magni iure! Voluptas.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptate animi saepe ducimus eum natus excepturi ex architecto quos odio, magnam suscipit dolorem, quibusdam cupiditate quae aut ipsam consequatur quidem?
                        </section>
                    </CardBody>
                </Card>
            </div>
            <div className="d-flex col-12">
                <Card className="col-12 m-1">
                    <CardBody>
                        <CardTitle tag="h2">Module #7</CardTitle>
                        <section className="mb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni libero quae nihil, ab, laborum cupiditate commodi facilis asperiores nobis excepturi, voluptatibus quas. Voluptatem sed dicta ea itaque eaque quasi repellendus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt tenetur saepe facilis sapiente consectetur, vel vitae cum. Quidem quae placeat asperiores delectus adipisci libero a repellat, laboriosam perferendis, ut accusamus.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae provident? Debitis fuga quas modi. Optio, mollitia! Aliquid tempora qui ab quisquam harum dignissimos eaque ea nulla magni iure! Voluptas.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, quasi suscipit? Esse rerum suscipit quos aspernatur odio alias, voluptatem laborum enim beatae odit dolorum placeat. Dolorem dicta eaque adipisci sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, consequatur praesentium nemo quia eum facilis, nobis ratione sit ducimus laboriosam, expedita assumenda ex suscipit harum non vel! Doloremque, id explicabo!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur a repellat non iste libero ex est nostrum illum, vel architecto blanditiis iusto corporis at hic enim mollitia neque id sunt.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dolorum deserunt consequatur voluptatibus corrupti? Hic obcaecati ex saepe voluptates atque voluptatum nobis laudantium, tempore eligendi tenetur eos nulla aliquid quis?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptate animi saepe ducimus eum natus excepturi ex architecto quos odio, magnam suscipit dolorem, quibusdam cupiditate quae aut ipsam consequatur quidem?
                        </section>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default ModuleMaterial