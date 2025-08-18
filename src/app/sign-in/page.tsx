"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in logic
    alert("Google sign-in not implemented.");
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email sign-in logic
    alert(`Sign in with email: ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/">
          <img
            src="/logo.avif"
            alt="Logo"
            className="h-16 w-auto mx-auto"
            style={{ maxHeight: 64 }}
          />
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-2">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Email Sign In */}
        <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Privacy Policy */}
        <div className="text-center mt-4">
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-500 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
