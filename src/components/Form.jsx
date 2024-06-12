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
import { useState } from "react";

const Form = ({ buttonType, formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [
    createUserWithEmailAndPassword,
    userCreate,
    loadingCreate,
    errorCreate,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, userSignIn, loadingSignIn, errorSignIn] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    if (formType === "Sign In") {
      await signInWithEmailAndPassword(email, password);
    } else {
      await createUserWithEmailAndPassword(email, password);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
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
        <div className="border-solid border-white border-t-2 w-36"></div>
        <Label text="Or Continue With" classes="text-white" />
        <div className="border-solid border-white border-t-2 w-36"></div>
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
