import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { toast } from "react-toastify";
import { createApi } from "../../hook/api/api";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = async (data) => {
    const newData = { ...data, email: data.email?.trim() };
    try {
      const user = await createApi(newData, "/signup");
      console.log("user", user);
      if (user?.user) {
        toast.success("Bạn đăng ký thành công");
        navigate("/auth/sign-in");
      } else {
        toast.error("Email đã tồn tại");
      }
    } catch (error) {
      console.log("error signup", error);
    }
  };

  return (
    <div className="w-full h-screen mx-auto ">
      <div className="absolute md:top-[107px] top-[67px] left-1/2 -translate-x-1/2 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:p-[37px_36px_40px] p-[32px_16px] md:w-[572px] mx-auto border border-stroke rounded-md bg-textWhite md:mb-10 mb-[32px] w-full"
        >
          <h2 className="md:text-3xl text-xl font-semibold text-center text-text1 md:mb-[52.5px] mb-[24px]">
            Register
          </h2>

          <div className="flex gap-[14px] flex-col md:mb-[38px] mb-[22px]">
            <label
              htmlFor="username"
              className="text-sm font-semibold cursor-pointer text-text2"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              className="md:w-full w-[312px] px-2 py-[13px]  border rounded-md outline-none border-stroke focus:border-primary transition-all"
            />
            {errors.username && (
              <p className="text-red-500"> {errors.username.message}</p>
            )}
          </div>

          <div className="flex gap-[14px] flex-col md:mb-[38px] mb-[22px]">
            <label
              htmlFor="email"
              className="text-sm font-semibold cursor-pointer text-text2"
            >
              Email address
            </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email invalidate",
                },
              })}
              className="md:w-full w-[312px] px-2 py-[13px]  border rounded-md outline-none border-stroke focus:border-primary transition-all"
            />
            {errors.username && (
              <p className="text-red-500"> {errors.username.message}</p>
            )}
          </div>

          <div className="flex gap-[14px] flex-col mb-[22px]">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="text-sm font-semibold cursor-pointer text-text2"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full px-2 py-[13px] border rounded-md outline-none border-stroke focus:border-primary"
            />
            {errors.password && (
              <p className="text-red-500"> Password is required</p>
            )}
          </div>

          <div className="items-center justify-between mt-10">
            <button
              disabled={!!errors.username}
              className={clsx(
                "py-4 text-sm font-medium px-14 bg-blue-600 text-white rounded w-full",
                { "bg-blue-400": !!errors.username }
              )}
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <p className="flex justify-center gap-2 mb-20 text-black">
          Don’t have an account?
          <Link
            to="/auth/sign-in"
            className="underline text-black hover:text-blue-600 text-[15px]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
