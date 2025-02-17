"use client";
import { Login, SignUp } from "@/app/actions/actions";
import React from "react";
import { Toaster } from "sonner";
import AuthFormBtn from "./AuthFormBtn";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "login" | "signup";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [loginState, loginAction] = useFormState(Login, undefined);
  const [signupState, signupAction] = useFormState(SignUp, undefined);

  const errorMsg = type === "login" ? loginState?.message : signupState?.message;

  return (
    <form
      action={type === "login" ? loginAction : signupAction}
      className="w-full max-w-sm bg-white  space-y-4 "
    >
      {/* Email Field */}
      <div className="space-y-1">
        <label htmlFor="email" className="block text-gray-700 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
      </div>
      {errorMsg && (
        <p className="text-sm text-red-600 bg-red-100 border border-red-400 p-2 rounded-lg">
          {errorMsg}
        </p>
      )}


      {/* Submit Button */}
      <AuthFormBtn type={type} />

      
    </form>
  );
};

export default AuthForm;
