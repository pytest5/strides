import { FormHeader } from "@/components/FormHeader";
import { FormWrapper } from "@/components/FormWrapper";
import { LeftArrow } from "@/components/LeftArrow";
import LoginForm from "@/components/LoginForm";

export const LoginPage = () => {
  const formHeader = <FormHeader>Welcome back</FormHeader>;
  return (
    <div className="h-full bg-gray-100 ">
      <FormWrapper header={formHeader}>
        <LoginForm />
      </FormWrapper>
    </div>
  );
};
