const getDefaultUser = () => {
    let user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      return JSON.parse(user);
    } else {
      return {};
    }
  };
  
  const authHeader = () => {
    let user = localStorage.getItem("user") ? getDefaultUser() : {};
  
    if (user && user?.token) {
      return { Authorization: `Token ${user?.token}` };
    } else {
      return {};
    }
  };
  
  export default authHeader;
  
  