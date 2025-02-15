import { Login, SignUp } from "@/app/actions/actions";
import React from "react";

type AuthformProps = {  
  type: "login" | "signup"; 
}
const AuthForm = ({type}:AuthformProps) => {
  return (
    <form action={ type==="login"? Login :SignUp} className="w-full max-w-sm bg-white rounded-lg space-y-4">
      {/* Email Field */}
      <div className="space-y-1">
        <label htmlFor="email" className="block text-gray-700 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg "
          placeholder="Enter your email"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <label htmlFor="password" className="block text-gray-700 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
   
          className="w-full px-3 py-2 border border-gray-300 rounded-lg "
          placeholder="Enter your password"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="p-8 rounded-xl bg-black text-white font-medium py-2  hover:bg-zinc-700 transition duration-200 active:scale-95"
      >
        {type==='login' ?'Login' :'Signup'}
      </button>
    </form>
  );
};

export default AuthForm;
