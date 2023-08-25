import React, { useContext, useEffect, useState } from 'react'
import Base from '../../components/Base'
import userContext from '../../context/userContext'
import { useParams } from 'react-router-dom'
import { getUser } from '../../services/user-service'
import { Card, CardBody, Col, Container, Input, Row, Table } from 'reactstrap'
import ViewUserProfile from '../../components/ViewUserProfile'

function Profileinfo() {
  const object = useContext(userContext)
  const {userId} = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser(userId).then(data => {
      console.log(data);
      setUser({ ...data })
    })
  }, [])

   /*  view user profile */
   const userView = () => {
    return (
      <Row>
        <Col  md={{size:8, offset: 2}}>
        <ViewUserProfile user={user} />
        </Col>
      </Row>
     

    )
  }

  return (
   <Base>
     {user? userView(): ''}
   </Base>
  )
}

export default Profileinfo