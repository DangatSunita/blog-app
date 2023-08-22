import Base from "../components/Base"
import userContext from "../context/userContext";



const About =() =>{
    return (
        <userContext.Consumer>
      {(user) => (
        <Base>
          <h1>this is about page</h1>
          <p>we are building blog website</p>
          <h1>Welcome user: {user.name}</h1>
        </Base>
      )}
    </userContext.Consumer>
    );
};

export default About

