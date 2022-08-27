import { Card } from "@/features/common/components/Card";
import { SignUpForm } from "@/features/signUp/components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Card>
        <h1 className="text-2xl text-theme-color1 text-center">
          Sign up as Zpace member
        </h1>
        <SignUpForm />
      </Card>
    </div>
  );
};
export default SignUpPage;
