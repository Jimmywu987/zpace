import { Card } from "@/features/common/components/Card";
import { LoginForm } from "@/features/login/components/LoginForm";
const LoginPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Card>
        <h1 className="text-2xl text-theme-color1 text-center">Login</h1>
        <LoginForm />
      </Card>
    </div>
  );
};
export default LoginPage;
