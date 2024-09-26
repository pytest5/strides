import { FormHeader } from "@/components/FormHeader";
import { FormWrapper } from "@/components/FormWrapper";
import { LeftArrow } from "@/components/LeftArrow";
import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const formHeader = (
    <div className="text-center">
      <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
      <p className="mt-2 text-sm text-gray-600">
        New here?{" "}
        <Link
          to="/signup"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
  return (
    <div className="h-full bg-gray-100 ">
      <FormWrapper header={formHeader}>
        <LoginForm />
      </FormWrapper>
    </div>
  );
};
