//isLoggedIn=>

export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data != null) return true;
    else return false;
  };
  
  //doLogin=> data=>set to localstorage
  
  export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
  };

  //doLogout=> remove from localStorage
  export const doLogout=(next) => {
    localStorage.removeItem("data");
    next();
  }

  //get currentUser
  export const getCurrentUserDetail = () => {
    if (isLoggedIn()) {
      return JSON.parse(localStorage.getItem("data")).user;
    } else {
      return undefined;
    }
  };

  export const getToken=()=>{
    if(isLoggedIn()){
      console.log("getToken");
      console.log(localStorage.getItem("data"));
      const data = JSON.parse(localStorage.getItem("data"));
      console.log('data token  : '+data.token);
      //return localStorage.getItem("data")['token'];
      return data.token;
    }else{
      return null;
    }
  }