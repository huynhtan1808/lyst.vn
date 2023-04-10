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
  const loadingToast = toast.loading("Đang đăng nhập");

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

    toast.error("Có lỗi xảy ra, vui lòng thử lại.", {
      id: loadingToast,
    });
  }
};

  const signInHandler = async () => {

    const loadingToast = toast.loading("Đang đăng nhập...");
  
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
        toast.success("Đăng nhập thành công", {
          id: loadingToast,
          icon: "👍",
        });
      }
    } catch (error) {
      console.log(error);
  
      toast.error("Có lỗi xảy ra, vui lòng thử lại.", {
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
            LeftIcon={FcGoogle}
            label="Đăng nhập với Google"
          />
        </div>
      <form
        className="mt-4 space-y-4"
        onSubmit={(e) => {
          // to prevent refreshnig when user submits the form.
          e.preventDefault();
        }}
      >
        {/* divider */}
        <div className="flex justify-center items-center relative h-12">
          <hr className="absolute text-neutral-200 w-full"/>
          <div className="relative p-4 bg-white text-sm text-neutral-500">
          <p>Hoặc</p>
          </div>
        </div>
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
              className="text-neutral-500 hover:text-green-600"
            >
              Quên mật khẩu?
            </a>
          </div>
        </div>
      </form>
    </div>
  )

  const footerContent = (
  <div className="text-neutral-500 text-sm text-center">
    <p>Chưa có tài khoản?{" "}
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
      actionLabel="Đăng nhập"
      onClose={loginModal.onClose}
      onSubmit={signInHandler}
      body={bodyContent}
      footer={footerContent}
      secondaryAction={googleSignInHandler}
      className="w-full md:max-w-sm"
    />
  );
}

export default LoginModal;