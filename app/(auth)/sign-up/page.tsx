"use client";

import React from "react";
import { Eye, Apple, Globe} from "lucide-react";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 bg-black text-white flex-col justify-between p-12">
        <div>
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-md p-2">
              <img
                src="/logo.svg"
                alt="Nike"
                className="w-8 h-8 object-contain invert"
              />
            </div>
          </div>

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

        <p className="text-sm text-gray-400">
          © 2024 Nike. All rights reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 md:px-16">
        <div className="max-w-md w-full space-y-6">
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-black font-semibold">
              Sign In
            </Link>
          </p>

          <h2 className="text-2xl font-bold text-center text-gray-900">
            Join Nike Today!
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Create your account to start your fitness journey
          </p>

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

          <div className="flex items-center justify-center my-4">
            <div className="w-1/5 border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400 text-sm">Or sign up with</span>
            <div className="w-1/5 border-t border-gray-300"></div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="mt-1 w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
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
                  type="password"
                  placeholder="minimum 8 characters"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <Eye className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-900 transition"
            >
              Sign Up
            </button>

            <p className="text-xs text-center text-gray-500 mt-2">
              By signing up, you agree to our{" "}
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

export default SignupPage;
