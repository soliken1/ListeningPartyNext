"use client";
import Button from "./Button";
import Inputbox from "./Inputbox";
import Label from "./Label";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth, googleProvider } from "../configs/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "nookies";

const Form = ({ buttonType, formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [
    createUserWithEmailAndPassword,
    userCreate,
    loadingCreate,
    errorCreate,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, userSignIn, loadingSignIn, errorSignIn] =
    useSignInWithEmailAndPassword(auth);

  const setServerCookie = async (user) => {
    await fetch("/pages/api/setCookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: user.uid, email: user.email }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      let userCredential;
      if (formType === "Sign In") {
        userCredential = await signInWithEmailAndPassword(email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(email, password);
      }
      await setServerCookie(userCredential.user);
      router.push("/rooms");
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setCookie(null, "currentUser", user.uid, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      router.push("/rooms");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="flex flex-col flex-nowrap gap-5 mt-5">
      <form
        className="flex flex-col flex-nowrap gap-5 mt-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col flex-nowrap gap-3">
          <Label text="Email Address or Username" classes="text-white" />
          <Inputbox
            type="text"
            classes="h-9 rounded ps-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-nowrap gap-3">
          <Label text="Password" classes="text-white" />
          <Inputbox
            type="password"
            classes="h-9 rounded ps-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {formType === "Sign In" && (
          <div className="flex justify-between">
            <div className="flex flex-row items-center gap-2 flex-nowrap">
              <Inputbox
                type="checkbox"
                name="remember"
                classes="text-white w-4 h-4"
              />
              <Label
                forTag="remember"
                classes="text-white"
                text="Remember Me"
              />
            </div>
            <Label text="Forgot Password?" classes="text-blue-500" />
          </div>
        )}
        <Button
          type="submit"
          text={buttonType}
          classes="text-white bg-green-400 pt-2 pb-2 rounded-lg shadow-2xl mt-3"
        />
        {errorCreate && <p className="text-red-500">{errorCreate.message}</p>}
        {errorSignIn && <p className="text-red-500">{errorSignIn.message}</p>}
      </form>
      <div className="flex items-center justify-between flex-row flex-nowrap mt-5">
        <div className="border-solid border-white border-t-2 w-20 md:w-32"></div>
        <Label text="Or" classes="text-white w-32 text-center" />
        <div className="border-solid border-white border-t-2 w-20 md:w-32"></div>
      </div>
      <div className="flex justify-evenly flex-row flex-nowrap gap-3">
        <Button
          text="Google"
          classes="text-white border-solid border-2 border-gray-700 pt-2 pb-2 rounded w-44 flex flex-row items-center justify-evenly"
          image={"/google.png"}
          imgclass="w-6 h-6"
          onClick={handleGoogleLogin}
        />
        <Button
          text="Facebook"
          classes="text-white border-solid border-2 border-gray-700 pt-2 pb-2 rounded w-44 flex flex-row items-center justify-evenly"
          image={"/facebook.png"}
          imgclass="w-6 h-6"
        />
      </div>
    </div>
  );
};

export default Form;
