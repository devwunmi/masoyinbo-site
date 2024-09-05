import { API_URL } from "@/constants/api";
import { userRegisterationSchema } from "@/validationSchema/userSchema";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";

const SignUp = () => {

  const URL = `${API_URL}/v1/auth/signup`;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(URL, values, {});
      localStorage.setItem('userDetails', JSON.stringify(response.data.user));
      toast.success("User registered successfully.");
      console.log(response);
    } catch (error) {
      toast.error("Sign up failed. Please try again later.");
      console.error("Sign up error:", error);

    } finally {

      setLoading(false);
    }
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: userRegisterationSchema,
    onSubmit,
  });

  return (
    <div>
      (
      <section>
        <main className="pt-20 pb-5">
          <div className="max-w-md mx-auto shadow-lg p-6 rounded">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-500">
                  fullName
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineUser className="mr-2 text-gray-500 " />
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    value={values.fullName}
                    autoComplete="false"
                    placeholder="fullName"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
                <span className="text-red-500">{errors.fullName}</span>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-500">
                  Username
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineUser className="mr-2 text-gray-500 " />
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    autoComplete="false"
                    placeholder="Username"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
                <span className="text-red-500">{errors.username}</span>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineMail className="mr-2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Email Address"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
                <span className="text-red-500">{errors.email}</span>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-500">
                  Password
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineLock className="mr-2 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Password"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
                <span className="text-red-500">{errors.password}</span>
              </div>
              {loading ? (
                <div></div>
              ) : (
                <button
                  className="w-full bg-green-500 text-black py-2 px-4 rounded-md hover:bg-green-600 outline-none focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 focus:ring-offset-green-100"
                  type="submit"
                  disabled={loading}
                >
                  Sign Up as Admin
                </button>
              )}
              <div className="text-center mt-4 mb-14">
                <p className="text-gray-500">Already have an admin account?</p>
                <Link href="/login" className="text-green-400 hover:underline">Admin Login here</Link>
              </div>
            </form>
          </div>
        </main>
      </section>
      )
    </div>
  );
};

export default SignUp;
