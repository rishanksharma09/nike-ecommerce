"use client";

import React, { useState } from "react";
import { Eye, Apple, Globe } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; //import the auth client


const SignInPage = () => {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const handleSignIn=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: false
}, {
    //callbacks
})
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 bg-black text-white flex-col justify-between p-12">
        {/* Logo */}
        <div>
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-md p-2">
              <img
                src="/logo.svg"
                alt="Nike Logo"
                className="w-8 h-8 object-contain invert "
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="mt-40">
            <h1 className="text-4xl font-bold mb-4">Just Do It</h1>
            <p className="text-gray-400">
              Join millions of athletes and fitness enthusiasts who trust Nike
              for their performance needs.
            </p>

            {/* <div className="flex space-x-2 mt-6">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            </div> */}
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400">© 2024 Nike. All rights reserved.</p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 md:px-16">
        <div className="max-w-md w-full space-y-6">
          {/* Top Text */}
          <p className="text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-black font-semibold">
              Sign Up
            </Link>
          </p>

          <h2 className="text-2xl font-bold text-center text-gray-900">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Sign in to continue your fitness journey
          </p>

          {/* Third-party buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-3 hover:bg-gray-50 transition">
              <Globe className="w-5 h-5 mr-2" />
              Continue with Google
            </button>

            <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-3 hover:bg-gray-50 transition">
              <Apple className="w-5 h-5 mr-2" />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="w-1/5 border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400 text-sm">Or sign in with</span>
            <div className="w-1/5 border-t border-gray-300"></div>
          </div>

          {/* Form */}
          <form className="space-y-4" 
          onSubmit={(e)=>handleSignIn(e)}>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
              required
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="johndoe@gmail.com"
                className="mt-1 w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                required
                  type="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  placeholder="minimum 8 characters"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <Eye className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-black font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-900 transition"
            >
              Sign In
            </button>

            <p className="text-xs text-center text-gray-500 mt-2">
              By signing in, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
