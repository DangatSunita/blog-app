import React from 'react'
import { Button, Card, CardBody, CardText } from 'reactstrap'

function Post({post={title:"This is default post tilte", content:"This is default content"}}) {
  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <h1>{post.title}</h1>
            <CardText>
                {post.content.substring(0,20)}...
            </CardText>

            <div>
                <Button>Read  more</Button>
            </div>
        </CardBody>
    </Card>
  )
}

export default Post