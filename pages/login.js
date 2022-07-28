import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { auth, provider } from "../firebase";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  return (
    <Wrapper>
      <Wrapper2>
        <CarbukLogo src="/carbuk_logo.png" />
        <Title>Log in to access your account</Title>
        <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />
        <SignInButton onClick={() => signInWithPopup(auth, provider)}>
          Sign in with Google
        </SignInButton>
      </Wrapper2>
    </Wrapper>
  );
};

export default Login;

const Wrapper = tw.div`flex justify-center h-screen bg-gray-200 w-screen p-4`;
const Wrapper2 = tw.div`flex flex-col w-96`;
const SignInButton = tw.button`bg-black text-white text-center mt-2 mx-4 px-4 py-3 text-2xl cursor-pointer`;
const CarbukLogo = tw.img`h-20 w-auto object-contain self-start`;
const Title = tw.div`text-5xl pt-4 text-gray-500`;
const HeadImage = tw.img`w-full object-contain`;
