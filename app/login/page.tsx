"use client"; // this will tell nextjs to render page client side

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import React, { useState } from "react";
import AuthForm from "../../components/AuthForm";
import toast, { Toaster } from "react-hot-toast";
import {supabaseClient}  from "@/lib/supabase-browser";
import LogoutButton from "@/components/LogoutButton";
import { useUser } from '@/contexts/AuthContext';


type Props = {};

function AuthPage({}: Props) {

  const {user} = useUser();
  const supabase = supabaseClient()

  
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
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

  // Login with password handler
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

  // handle submit
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    event: "signin" | "signinWithGoogle"
  ) => {
    switch (event) {
      case "signinWithGoogle":
        await googleSignInHandler();
        break;

      case "signin":
        await signInHandler();
        break;

      default:
        break;
    }
  };

  return user ? (
  <LogoutButton/>
  ) : (
    <>
      <AuthForm
        handleSubmit={handleSubmit}
        email={credentials.email}
        password={credentials.password}
        setEmail={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        setPassword={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
    </>
    )
}

export default AuthPage;