import Form from "@/src/components/Form";
import Label from "@/src/components/Label";
import Link from "next/link";

function Login() {
  return (
    <main className="md:flex md:justify-center md:items-center h-screen">
      <div className="flex flex-col flex-nowrap justify-center items-center h-full md:items-stretch md:justify-center gap-2 md:w-1/3 md:h-2/3">
        <Label
          text="Sign In To Your Account"
          classes="text-white font-medium	text-xl tracking-wide"
        />
        <div className="flex flex-row flex-nowrap gap-1">
          <Label text="Not A Member?" classes="text-gray-300" />
          <Link href="/register" className="text-blue-500">
            Register Here
          </Link>
        </div>
        <Form buttonType="Sign In" formType="Sign In" />
      </div>
    </main>
  );
}

export default Login;
