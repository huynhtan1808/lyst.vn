import React from "react";
import { FcGoogle } from "react-icons/fc";


type Props = {
  handleSubmit: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    event: "signin" | "signinWithGoogle"
  ) => void;
  email: string;
  password: string;
  setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AuthForm = ({
  handleSubmit,
  email,
  password,
  setEmail,
  setPassword,
}: Props) => {

  return (
    <div className="w-full max-w-xs text-center space-y-8 mx-auto">
      <div className="group transition-all duration-150 space-y-3">
      <h1 className="text-xl font-bold">Sign In</h1>
          <button
            className="shadow px-3 py-2 relative bg-white text-black font-bold flex items-center justify-center w-full hover:shadow-lg"
            onClick={(e) => handleSubmit(e, "signinWithGoogle")}
          >
            <FcGoogle className="mr-6"/>
            Sign In with Google
          </button>  
        </div>
      <form
        className="mt-8 space-y-6"
        onSubmit={(e) => {
          // to prevent refreshnig when user submits the form.
          e.preventDefault();
        }}
      >
        <p className="text-center text-gray-500">or</p>
        <div className="-space-y-px rounded-md shadow-sm">
          {/* email box */}
          <input
            required
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={setEmail}
          />
          {/* email box */}
          <input
            required
            type="password"
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            value={password}
            onChange={setPassword}
            placeholder="Please enter your password"
          />
        </div>

        <div className="flex items-center justify-end">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-gray-500 hover:text-green-600"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="group transition-all duration-150 space-y-3">
          <button
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-500 focus:outline-none"
            onClick={(e) => handleSubmit(e, "signin")}
          >
            Sign In
          </button>  
        </div>
      </form>
    </div>
  );
};

export default AuthForm;