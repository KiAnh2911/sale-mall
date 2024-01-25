import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthRouter = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default AuthRouter;
