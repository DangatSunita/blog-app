import { useEffect, useRef, useState } from "react"
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import { loadAllCategories } from "../services/category-service"
import JoditEditor from "jodit-react"
import { toast } from "react-toastify"
import { createPost as doCreatePost } from "../services/post-service"

const AddPost =()=>{

    const editor = useRef(null)
    // const [content,setContent] =useState('')
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState(undefined)


    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    // const config={
    //     placeholder:"Start typing...",

    // }


    useEffect(
        () => {

            // setUser(getCurrentUserDetail())
            loadAllCategories().then((data) => {
                console.log(data)
                setCategories(data)
            }).catch(error => {
                console.log(error)
            })
        },
        []
    )

     //field changed function
     const fieldChanged = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    const contentFieldChanaged = (data) => {
        setPost({ ...post, 'content': data })
    }

    
    //create post function
    const createPost = (event) => {
        event.preventDefault();
        if (post.title.trim() === '') {
            toast.error("post  title is required")
            return;
        }

        if (post.content.trim() === '') {
            toast.error("post content is required")
            return
        }

        if (post.categoryId === '') {
            toast.error("Please select some category")
            return;
        }

          //submit the form one server
          post['userId'] = user.id
         doCreatePost(post).then(data=>{
            toast.success("post created ")
            // console.log(post)
            setPost({
                title: '',
                content: '',
                categoryId: ''
            })
         }).catch((error)=>{
            toast.error("Post not created due to some error...")
            // console.log(error)
         })
    }

    return(
        <div className="wrapper">
           <Card className="shadow-sm mt-2">
            <CardBody> 
                  {JSON.stringify(post)}
                <h3>What is going on</h3>
                <Form onSubmit={createPost}>
                    <div className="my-3">
                        <Label for="title">Post tiltle</Label>
                        <Input type="text" id="title" placeholder="Enter post here"
                        name="title"
                        onChange={fieldChanged}/>
                    </div>
                    <div className="my-3">
                        <Label for="content">Post content</Label>
                        {/* <Input type="textarea" id="content" placeholder="Enter here" style={{height:'100px'}}/> */}
                        <JoditEditor
                            ref={editor}
                            value={post.content}
                            // config={config}
                            onChange={contentFieldChanaged}
                        />
                    </div>
                    <div className="my-3">
                        <Label for="category" >Post Category</Label>
                        <Input type="select" id="category" placeholder="Enter here"
                        name="categoryId"  onChange={fieldChanged} defaultValue={0}>
                            
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
                        <Button type="submit" color="primary">Create Post</Button>
                        <Button className="ms-2" color="secondary">Reset Content</Button>
                    </Container>
                </Form>
            </CardBody>
           </Card>
        </div>
    )
}

export default AddPost