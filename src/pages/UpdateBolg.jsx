import React, { useContext, useEffect, useRef, useState } from 'react'
import Base from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/userContext'
import { loadPost } from '../services/post-service'
import { toast } from "react-toastify"
import { loadAllCategories } from '../services/category-service'
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import JoditEditor from "jodit-react"
import { updatePost as doUpdatePost } from '../services/post-service'

function UpdateBolg() {

    const editor = useRef(null)
    const {blogId} = useParams()
    const object = useContext(userContext) 
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    useEffect(()=>{

        loadAllCategories().then((data) => {
            console.log(data)
            setCategories(data)
        }).catch(error => {
            console.log(error)
        })

        //load the blog from database
        loadPost(blogId).then(data => {
            console.log(data)
            setPost({ ...data, categoryId: data.category.categoryId })
        })
            .catch(error => {
                console.log(error);
                toast.error("error in loading the blog")
            })
    },[])

    useEffect(() => {
        console.log("first")
        if (post) {
            if (post.user.id != object.user.data.id) {
                toast.error("This is not your post !!")
                navigate("/")
            }

        }

    }, [post])

    const handleChange = (event, fieldName) => {
        setPost({
            ...post,
            [fieldName]: event.target.value
        })

    }

    const updatePost = (event) => {
        event.preventDefult()
        console.log(post)
        doUpdatePost({ ...post, category: { categoryId: post.categoryId } }, post.postId)
            .then(res => {
                console.log(res)
                toast.success("Post updated")
            })
            .catch(error => {
                console.log(error);
                toast.error("Error in upading post")
            })

    }
const updateHtml = () => {
  return (
    <div className="wrapper">
        {JSON.stringify(post)}
    <Card className="shadow-sm mt-2">
     <CardBody> 
         <h3>Update post here....</h3>
         <Form onSubmit={updatePost}>
             <div className="my-3">
                 <Label for="title">Post tiltle</Label>
                 <Input type="text" id="title" placeholder="Enter post here"
                 name="title"
                 value={post.title}
                 onChange={(event) => handleChange(event, 'title')}/>
             </div>
             <div className="my-3">
                 <Label for="content">Post content</Label>
                 {/* <Input type="textarea" id="content" placeholder="Enter here" style={{height:'100px'}}/> */}
                 <JoditEditor
                     ref={editor}
                     value={post.content}
                     // config={config}
                     onChange={newContent => setPost({ ...post, content: newContent })}
                 />
             </div>

             {/* File field */}
             <div className="mt-3">
                 <Label for="image">Select Post Banner</Label>
                 <Input id="image" type="file" onChange={''}/>
             </div>

             <div className="my-3">
                 <Label for="category" >Post Category</Label>
                 <Input type="select" id="category" placeholder="Enter here"
                    name="categoryId"  value={post.categoryId} 
                    onChange={(event) => handleChange(event, 'categoryId')} >
                     
                     <option disabled value={0}>Select Category</option>
                     {
                          categories.map((category) => (
                             <option value={category.categoryId} key={category.categoryId}>
                                 {category.categoryTitle}
                             </option>
                         ))

                     }
                    
                 </Input>
             </div>
             <Container className="text-center">
                 <Button type="submit" color="primary">Update Post</Button>
                 <Button className="ms-2" color="secondary">Reset Content</Button>
             </Container>
         </Form>
     </CardBody>
    </Card>
 </div>
  )
}
  return (
    <Base>
       <Container>
       {post && updateHtml()}
       </Container>
    </Base>
)
}

export default UpdateBolg