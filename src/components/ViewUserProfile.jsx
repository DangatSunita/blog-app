import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Input, Row, Table } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth'

const ViewUserProfile = ({user, updateProfileClick }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [login, setLogin] = useState(false)

    useEffect(()=>{
        setLogin(isLoggedIn())
    })
  return (
    <Card className='mt-2 border-0 rounded-0 shadow-sm'>
    <CardBody>
      <h3 className='text-uppercase'> User Information </h3>
      <Container className='text-center'>
        <img src={user.image ? user.image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F6142%2Fscreenshots%2F5679189%2Fmedia%2F1b96ad1f07feee81fa83c877a1e350ce.png%3Fresize%3D400x0&tbnid=06x4OFk2R_m0WM&vet=10CAEQMyhoahcKEwjA-6vr4veAAxUAAAAAHQAAAAAQAg..i&imgrefurl=https%3A%2F%2Fdribbble.com%2Ftags%2Fdefault_image&docid=hw9owYXFIfVK_M&w=400&h=300&q=default%20profile%20picture&ved=0CAEQMyhoahcKEwjA-6vr4veAAxUAAAAAHQAAAAAQAg'}
         alt="user profile picture" className="img-fluid rounded-circle" style={{maxWidth:'250px', maxHeight:'250'}} />
      </Container>

      <Table responsive striped hover bordered={true} className='text-center mt-5'>
        <tbody>
          <tr>
            <td >
              LCWDBlLOGS ID
            </td>
            <td>
              LCWD{user.id}
            </td>
          </tr>
           <tr>
            <td >
              USER NAME
            </td>
            <td>
              <Input type='text' value={user.name} />
            </td>
          </tr>
          <tr>
            <td >
              USER EMAIL
            </td>
            <td>
              {user.email}
            </td>
          </tr>
          <tr>
            <td >
              ABOUT
            </td>
            <td>
              <Input type='textarea' value={user.about} />
            </td>

          </tr> 
          <tr>
            <td>
              ROLE
            </td>
            <td>
              {user.roles.map((role) => {
                return (
                  <div key={role.id}>{role.name}</div>
                )
              })}
            </td>
          </tr> 
        </tbody>
      </Table>
      {currentUser ? (currentUser.id == user.id) ? (
                    <CardFooter className='text-center'>
                        <Button onClick={updateProfileClick} color='warning' >Update Profile</Button>
                    </CardFooter>
                ) : '' : ''}
    </CardBody>
   </Card>
  )
}

export default ViewUserProfile