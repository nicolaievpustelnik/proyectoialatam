
import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default Auth;
