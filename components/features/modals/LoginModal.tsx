'use client';

import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useUser } from '@/contexts/AuthContext';
import toast, { Toaster } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";



const LoginModal = () => {

  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const {supabase}  = useUser();

  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  // Login with Social handler
const googleSignInHandler = async () => {
  const loadingToast = toast.loading("Signing in");

  try {
    const {
      data: {  },
      error,
    } = await supabase.auth.signInWithOAuth({ provider: "google" });

    if (error) {
      toast.error(error.message, {
        id: loadingToast,
      });
    }

    if (error) {
      toast.error(error.message, {
        id: loadingToast,
      });
    }

  } catch (error) {
    console.log(error);

    toast.error("Error occured", {
      id: loadingToast,
    });
  }
};

  const signInHandler = async () => {

    const loadingToast = toast.loading("Signing in");
  
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      },
      );
  
      if (error) {
        toast.error(error.message, {
          id: loadingToast,
        });
      }
  
      if (user) {
        toast.success("Signed in", {
          id: loadingToast,
          icon: "👍",
        });
      }
    } catch (error) {
      console.log(error);
  
      toast.error("Error occured", {
        id: loadingToast,
      });
    }
  };


  const onToggle = useCallback(() => {
    loginModal.onClose();
  }, [loginModal])


  const bodyContent = (
    <div className="w-full max-w-xs text-center space-y-8 mx-auto">
      <div className="group transition-all duration-150 space-y-3">
          <button
            className="shadow px-3 py-2 relative bg-white text-black font-bold flex items-center justify-center w-full hover:shadow-lg"
            onClick={googleSignInHandler}
          >
            <FcGoogle className="mr-6"/>
            Đăng nhập với Google
          </button>  
        </div>
      <form
        className="mt-8 space-y-6"
        onSubmit={(e) => {
          // to prevent refreshnig when user submits the form.
          e.preventDefault();
        }}
      >
        <p className="text-center text-sm text-gray-500">hoặc</p>
        <div className="-space-y-px rounded-md shadow-sm">
          {/* email box */}
          <input
            required
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          {/* email box */}
          <input
            required
            type="password"
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Mật khẩu"
          />
        </div>

        <div className="flex items-center justify-end">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-gray-500 hover:text-green-600"
            >
              Quên mật khẩu?
            </a>
          </div>
        </div>

        <div className="group transition-all duration-150 space-y-3">
          <button
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-500 focus:outline-none"
            onClick={signInHandler}
          >
            Đăng nhập
          </button>  
        </div>
      </form>
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="
      text-neutral-500 text-center mt-4">
        <p>Chưa có tài khoản?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Đăng ký</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Đăng nhập"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit = {signInHandler}
      body={bodyContent}
      footer={footerContent}
      secondaryAction={googleSignInHandler}
    />
  );
}

export default LoginModal;