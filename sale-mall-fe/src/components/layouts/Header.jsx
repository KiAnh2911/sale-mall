import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };
  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex gap-5 ">
        {!token ? (
          <>
            <Link
              to={"/auth/sign-in"}
              className="px-5 py-2 text-blue-500 border rounded-md hover:text-white hover:bg-blue-500"
            >
              Sign in
            </Link>
            <Link
              to={"/auth/sign-up"}
              className="px-5 py-2 text-blue-500 border rounded-md hover:text-white hover:bg-blue-500"
            >
              Sign up
            </Link>
          </>
        ) : (
          <span
            className="px-5 py-2 text-blue-500 border rounded-md cursor-pointer hover:text-white hover:bg-blue-500"
            onClick={handleLogout}
          >
            Log out
          </span>
        )}
      </div>
      <Link
        to={"/product"}
        className="px-5 py-2 text-blue-500 border rounded-md hover:text-white hover:bg-blue-500"
      >
        Product List
      </Link>
    </div>
  );
};

export default Header;
