import Button from "./Button";
import Inputbox from "./Inputbox";
import Label from "./Label";

const Form = ({ buttonType, formType }) => {
  return (
    <form className="flex flex-col flex-nowrap gap-5 mt-5">
      <div className="flex flex-col flex-nowrap gap-3">
        <Label text="Email Address or Username" classes="text-white" />
        <Inputbox type="text" classes="h-9 rounded ps-2 text-sm" />
      </div>
      <div className="flex flex-col flex-nowrap gap-3">
        <Label text="Password" classes="text-white" />
        <Inputbox type="password" classes="h-9 rounded ps-2 text-sm" />
      </div>
      {formType === "Sign In" ? (
        <div className="flex justify-between">
          <div className="flex flex-row items-center gap-2 flex-nowrap">
            <Inputbox
              type="checkbox"
              name="remember"
              classes="text-white w-4 h-4"
            />
            <Label forTag="remember" classes="text-white" text="Remember Me" />
          </div>
          <Label text="Forgot Password?" classes="text-blue-500" />
        </div>
      ) : null}
      <Button
        text={buttonType}
        classes="text-white bg-green-400 pt-2 pb-2 rounded-lg shadow-2xl mt-3"
      />
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
        />
        <Button
          text="Facebook"
          classes="text-white border-solid border-2 border-gray-700 pt-2 pb-2 rounded w-44 flex flex-row items-center justify-evenly"
          image={"/facebook.png"}
          imgclass="w-6 h-6"
        />
      </div>
    </form>
  );
};

export default Form;
