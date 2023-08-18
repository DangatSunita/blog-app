import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import NewFeed from "../../components/NewFeed";

const Userdashboard = () =>{
    return (
        <Base>
            <Container>
                <AddPost/>
                <NewFeed />
            </Container>
   
        </Base>
    )
}

export default Userdashboard;