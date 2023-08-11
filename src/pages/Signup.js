import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signUp } from "../services/user-service";
import {toast} from 'react-toastify';

const Signup = () => {

    const [data, setData] =useState({
        name: "",
        email: "",
        password: "",
        about: "",
    })

    const [error, setError] = useState({
        errors: {},
        isError: false,
    })

    const handelChange =(event, property)=>{
        setData({...data, [property]: event.target.value})
    }
    // resetting form
    const resetData=()=>{
        setData({
        name: "",
        email: "",
        password: "",
        about: "",
        });
    };
    // submit form

    const submitForm=(event)=>{
        event.preventDefault();

    // if(error.isError){
    //   toast.error("Form data is invalid , correct all details then submit. ");
    //   return;
    // }

        console.log(data);

        //call server api for sending data
        signUp(data).then((resp)=>{
        console.log(resp);
        console.log("success log");
        toast.success("User is registered successfully... user id" + resp.id);
        setData({
            name: "",
            email: "",
            password: "",
            about: "",
            })
    }).catch((error)=>{
        console.log(error);
        console.log("Error log");

        setError({
            errors: error,
            isError: true,
          });
    });
    }

    return(
        <Base>
            <Container>
               <Row className="mt-4">
                {/* {JSON.stringify(data)} */}
                    <Col sm={{size:6, offset:3}}>
                    <Card color="dark" outline>
                <CardHeader>
                    <h3>Fill Information To Register</h3>
                </CardHeader>

                <CardBody>
                    {/* Creating form*/}
                    <Form onSubmit={submitForm}>
                        {/* Name field*/}
                        <FormGroup>
                            <Label for="name"> Enter name</Label>
                            <Input type="text" placeholder="Enter here" id="name"
                            onChange={(e)=>handelChange(e,"name")}
                            value={data.name}
                            invalid={
                                error.errors?.response?.data?.name ? true : false
                              }
                            />
                            <FormFeedback>
                                {error.errors?.response?.data?.name}
                            </FormFeedback>
                        </FormGroup>
                        
                        {/* Email field*/}
                        <FormGroup>
                            <Label for="email"> Enter email</Label>
                            <Input type="email" placeholder="Enter here" id="email"
                             onChange={(e)=>handelChange(e,"email")}
                             value={data.email}
                             invalid={
                                error.errors?.response?.data?.email ? true : false
                              }
                             />
                            <FormFeedback>
                                {error.errors?.response?.data?.email}
                            </FormFeedback>
                        </FormGroup>
                       
                        {/* Password field*/}
                        <FormGroup>
                            <Label for="password"> Enter password</Label>
                            <Input type="password" placeholder="Enter here" id="password"
                             onChange={(e)=>handelChange(e,"password")}
                             value={data.password}
                             invalid={
                                error.errors?.response?.data?.password ? true : false
                              }
                            />

                            <FormFeedback>
                                {error.errors?.response?.data?.password}
                            </FormFeedback>
                        </FormGroup>

                        {/* About field*/}
                        <FormGroup>
                            <Label for="about"> About</Label>
                            <Input type="textarea" placeholder="Enter here" id="about"
                             onChange={(e)=>handelChange(e,"about")}
                             value={data.about}
                             style={{height:"250px"}}
                             invalid={
                                error.errors?.response?.data?.about ? true : false
                              }
                            />

                            <FormFeedback>
                                {error.errors?.response?.data?.about}
                            </FormFeedback>
                        </FormGroup>

                        <Container className="text-center">
                            <Button outline color="dark">Register</Button>
                            <Button onClick={resetData} outline color="dark" type="reset" className="ms-2">Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
               </Card>
                    </Col>
               </Row>
            </Container>
        </Base>
    );
};

export default Signup

