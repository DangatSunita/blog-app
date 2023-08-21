import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import Base from "../components/Base"
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap'
import { createComment, loadPost } from '../services/post-service'
import { BASE_URL } from '../services/helper'
import {toast} from 'react-toastify';
import { isLoggedIn } from '../auth'

const PostPage =()=> {
const {postId}= useParams()
const [post, setPost] = useState(null)
const [comment, setComment] = useState({
    conent: ''
})

    useEffect(() => {
        // load post of postId 
        loadPost(postId).then(data => {
            console.log(data);
            setPost(data)

        }).catch(error => {
            console.log(error)
            toast.error("Error in loading post")
        })

    }, [])

    const printDate = (numbers) => {

        return new Date(numbers).toLocaleDateString()
    }

    const submitPost=()=>{

        if(!isLoggedIn()){
                toast.error("Need to login first !!")
                return
        }

        if(comment.content.trim()===''){
            return
        }
        createComment(comment, post.postId)
        .then(data=>{
            console.log(data)
            toast.success("comment added ..")
            setPost({
                ...post,
                comments:[...post.comments,data.data]
            })
            setComment({
                content:''
            })
        }).catch(error=>{
            console.log(error)
        })
    }
  return (
    <Base>
        <Container>
            <Link to="/">Home</Link> / {post && (<Link to="" >  {post.title} </Link>)}
            <Row>
                <Col md={{
                    size:12
                }}>
                   <Card className='mt-3 ps-2 border-0'>
                   {
                    (post) &&(
                        <CardBody>
                        <CardText>Posted By <b>{post.user.name} </b> on 
                         <b>{printDate(post.addedDate)}</b></CardText>
                         <CardText className="mt-3">
                            <h1>{post.title}</h1>
                         </CardText>
                         <div className="image-container  mt-4 shadow  " style={{ maxWidth: '50%' }}>
                            <img className="img-fluid" src={BASE_URL + '/post/image/' + post.imageName} alt="" />
                        </div>
                        <CardText
                         className="mt-5" dangerouslySetInnerHTML={{ __html: post.content }}>

                         </CardText>
                         <CardText>
                            <span className="text-muted">{post.category.categoryTitle}</span>
                         </CardText>

                    </CardBody>
                    )
                   }
                   </Card>
                </Col>
            </Row>
            <Row className= "mt-4">
                <Col md={
                    {
                        size: 9,
                        offset: 1
                    }
                }>
                    <h3>Comments  ( {post ? post.comments.length : 0} )</h3>
                    {
                        post && post.comments.map((c, index) => (
                            <Card className="mt-4 border-0" key={index}>
                                <CardBody>
                                    <CardText>
                                        {c.content}
                                    </CardText>
                                </CardBody>
                            </Card>
                        ))
                    }

                    <Card className="mt-4 border-0" >
                        <CardBody>

                            <Input
                                type="textarea"
                                placeholder="Enter comment here"
                                value={comment.conent}
                                onChange={(event) => setComment({content:event.target.value})}
                            />

                            <Button onClick={submitPost} className="mt-2" color="primary">Submit</Button>
                        </CardBody>
                    </Card> 

                </Col>
            </Row>
        </Container>
    </Base>
  )
}

export default PostPage