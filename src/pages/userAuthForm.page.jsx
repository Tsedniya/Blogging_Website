import { Link } from "react-router-dom";
import { useState } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";
import api from "../common/api/route"; // Import the axios instance

const UserAuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    setIsSuccess(false);

    try {
      const endpoint = type === "sign-in" ? "/login" : "/signup";
      const payload =
        type === "sign-in"
          ? { email: formData.email, password: formData.password }
          : formData;

      const response = await api.post(endpoint, payload, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setMessage(response.data.message || "Success!");
        setIsSuccess(true);
      } else {
        setMessage(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
      console.error(error);
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    window.location.href = `${api.defaults.baseURL}/auth/google/redirect`;
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
          <h1 className="text-4xl capitalize text-center mb-24">
            {type === "sign-in" ? "Welcome back" : "Join us today"}
          </h1>

          {type !== "sign-in" && (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
              value={formData.fullname}
              onChange={handleChange}
            />
          )}
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
            value={formData.email}
            onChange={handleChange}
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-lock"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="btn-dark center mt-14" type="submit">
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
            type="button"
            onClick={handleGoogleLogin}
          >
            <img src={googleIcon} className="w-5" alt="Google Icon" />
            Continue with Google
          </button>

          {type === "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already have an account?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here
              </Link>
            </p>
          )}

          {message && (
            <p
              className={`mt-4 text-center ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
