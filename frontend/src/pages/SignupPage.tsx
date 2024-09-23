import { Link } from "react-router-dom";

import { FormWrapper } from "@/components/FormWrapper";
import SignupForm from "@/components/SignupForm";

export default function SignUpPage() {
  const formHeader = (
    <div className="text-center">
      <h2 className="mt-6 text-3xl font-bold text-gray-900">
        Create your account
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Log in
        </Link>
      </p>
    </div>
  );
  return (
    <FormWrapper header={formHeader}>
      <SignupForm />
    </FormWrapper>
  );
}
