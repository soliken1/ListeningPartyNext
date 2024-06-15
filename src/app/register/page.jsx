"use client";
import Form from "@/src/components/Form";
import Label from "@/src/components/Label";
import Link from "next/link";
function Register() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col flex-nowrap gap-2 w-1/3 h-2/3">
        <Label
          text="Register a New Account"
          classes="text-white font-medium	text-xl tracking-wide"
        />
        <div className="flex flex-row flex-nowrap gap-1">
          <Label text="Already A Member?" classes="text-gray-300" />
          <Link href="/login" className="text-blue-500">
            Login Here
          </Link>
        </div>
        <Form buttonType="Sign Up" formType="Sign Up" />
      </div>
    </main>
  );
}

export default Register;
