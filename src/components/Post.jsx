import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth'

function Post({post={id: -1, title:"This is default post tilte", content:"This is default content"}, deletePost}) {
  
  const [user, setUser] = useState(null)
  const [login, setLogin] = useState(null)

  useEffect(() => {
    setUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
  }, [])
  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 20) + "...." }}>
              
            </CardText>

            <div>
                <Link className='btn btn-secondary border-0' to={"/posts/" +post.postId}>Read  more</Link>
                { isLoggedIn && (user && user.id === post.user.id ? 
                <Button onClick={() => deletePost(post)} color='danger' className="ms-2">Delete</Button> : '')}
            </div>
        </CardBody>
    </Card>
  )
}

export default Post