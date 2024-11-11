import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        role: "",
    });


    const navigate = useNavigate();
    const handleSwitchToLogin = () => setIsLogin(true);
    const handleSwitchToRegister = () => setIsLogin(false);

    const handleChange = (e: React.FormEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // We need the response for login
                const response = await axios.post("http://localhost:5000/login", {
                    email: formData.email,
                    password: formData.password,
                });
                // Use the response for storing the token
                const accessToken=response.data.accessToken
                if(accessToken){
                    console.log(
                        localStorage.setItem("accessToken",accessToken )
                    );
                }
               
                alert("Log in successful");
                navigate("/app");
            } else {
                await axios.post("http://localhost:5000/register", {
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                });
                alert("Registration successful");
                handleSwitchToLogin();
            }
        } catch (error) {
            console.error(error);
            alert("Error occurred");
        }
    };

    return (
        <div className="bg-pink-500 flex justify-center items-center min-h-screen">
            <div className="border border-emerald-300 w-72 mb-3 p-4">
                <div className="text-center mb-4">
                    <h3 className="text-center text-2xl capitalize text-yellow-500">
                        Welcome to Note Taking App
                    </h3>
                </div>

                {isLogin ? (
                    <div className="form-container">
                        <h3 className="text-center text-2xl capitalize text-yellow-500 mb-4">
                            Log In
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2 justify-center items-center"
                        >
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-xl font-semibold">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="border text-black w-52 hover:border-slate-800"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-xl font-semibold">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    className=" text-black border w-52 hover:border-slate-800"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-purple-500 text-center text-white rounded-sm shadow-sm p-2 w-36 mb-2"
                            >
                                Login
                            </button>
                            <p className="text-gray-600 mt-2">
                                Forgot your password?{" "}
                                <button
                                    onClick={() =>
                                        alert("Redirect to password reset page or modal.")
                                    }
                                    className="text-blue-500 hover:underline"
                                >
                                    Reset Password
                                </button>
                            </p>
                            <p className="text-gray-600 mt-2">
                                Don&apos;t have an account?{" "}
                                <button
                                    onClick={handleSwitchToRegister}
                                    className="text-blue-500 hover:underline"
                                >
                                    Sign up
                                </button>
                            </p>
                        </form>
                    </div>
                ) : (
                    <div className="form-container">
                        <h3 className="text-center text-2xl capitalize text-yellow-500 mb-4">
                            Register
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2 justify-center items-center"
                        >
                            <div className="flex flex-col">
                                <label htmlFor="fName" className="text-xl font-semibold">
                                    Full Name:
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fName"
                                    required
                                    className=" text-black border w-52 hover:border-slate-800"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-xl font-semibold">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className=" text-black border w-52 hover:border-slate-800"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="role" className="text-xl font-semibold">
                                    Role:
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    id="role"
                                    required
                                    className=" text-black border w-52 hover:border-slate-800"
                                    value={formData.role}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-xl font-semibold">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    className=" text-black border w-52 hover:border-slate-800"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-purple-500  text-center text-white rounded-sm shadow-sm p-2 w-36 mb-2"
                            >
                                Register
                            </button>
                            <p className="text-gray-600 mt-2">
                                Already have an account?{" "}
                                <button
                                    onClick={handleSwitchToLogin}
                                    className="text-blue-500 hover:underline"
                                >
                                    Log in
                                </button>
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};