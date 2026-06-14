import { UserContext } from "./context.jsx";
import axios from "axios";

function Authcontext({ children }) {
  const registerUser = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        userData,
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ registerUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default Authcontext;
