'use client';

import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useUser } from '@/contexts/AuthContext';
import toast, { Toaster } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import Button from "@/components/shared/Button";


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
    <div className="text-center mx-auto">
      <div className="group transition-all duration-150 space-y-3">
          <Button
            className="relative border border-gray-200 bg-white hover:bg-gray-200 flex items-center justify-center w-full"
            onClick={googleSignInHandler}
          >
            <FcGoogle className="mr-6"/>
            Đăng nhập với Google
          </Button>  
        </div>
      <form
        className="mt-8 space-y-6"
        onSubmit={(e) => {
          // to prevent refreshnig when user submits the form.
          e.preventDefault();
        }}
      >
        <p className="text-center text-sm text-gray-500">hoặc</p>
        <div className="space-y-2 rounded-md">
          {/* email box */}
          <input
            required
            className="block w-full appearance-none border border-gray-200 px-3 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm rounded-md"
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
            className="block w-full appearance-none border border-gray-200 px-3 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm rounded-md"
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
  <div className="text-neutral-500 text-sm text-center">
    <p>Chưa có tài khoản?
      <span 
      onClick={onToggle} 
      className="text-neutral-800 cursor-pointer hover:underline"> 
      Đăng ký
      </span>
    </p>
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
      className="w-full md:max-w-sm"
    />
  );
}

export default LoginModal;