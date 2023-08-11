import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import {toast} from 'react-toastify';
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
const Login = () => {

    const[loginDetail, setLoginDetail] =useState({
        username: "",
        password: "",
    });

    const handleChange= (event, field)=>{
        let actualValue= event.target.value;
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue,
        });
    };

    const handleReset = () => {
        setLoginDetail({
          username: "",
          password: "",
        });
      };

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        console.log(loginDetail);

        if(loginDetail.username.trim()=="" ||
           loginDetail.password.trim()==""){
            toast.error("Username or Password is required");
            return;
        }

        loginUser(loginDetail).then((data) => {
            console.log(data);

            // save data to localStorage
            doLogin(data, ()=>{
                console.log("Login detail is saved to local storage")
            })
            toast.success("User Login successfully....");
        }).catch((error) =>{
          console.log(error);

          if (error.response.status == 400 || error.response.status == 404) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong  on sever !!");
          }
        });
    };

  
   

    return(
       <Base>
        <Container>
            <Row className="mt-4">
                <Col sm={{size:6, offset:3}}>
                    <Card color="dark" outline>
                        <CardHeader>
                            <h3> Login Here! </h3>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleFormSubmit}>
                                {/* Email field */}
                                <FormGroup>
                                    <Label for="email">Enter email</Label>
                                    <Input type="text" id="email" 
                                    value={loginDetail.username}
                                    onChange={(e)=> handleChange(e, "username")} /> 
                                </FormGroup>

                                 {/* Password field */}
                                 <FormGroup>
                                    <Label for="password">Enter Password</Label>
                                    <Input type="password" id="password" 
                                    value={loginDetail.password}
                                    onChange={(e)=> handleChange(e, "password")} /> 
                                </FormGroup>

                                <Container className="text-center">
                                <Button outline color="dark">Login</Button>
                                <Button  onClick={handleReset} className="ms-2" outline color="dark" >Reset</Button>
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

export default Login;

