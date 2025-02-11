import { useForm } from "react-hook-form";
import AuthModal from "./AuthModal";
import { LoginPayload } from "~/types/auth.type";
import { AuthService } from "~/services/auth.service";
import { redirect, useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: LoginPayload) => {
    // console.log("Login:", data);
    try {
      const response = await AuthService.login(data);
      console.log("Login successful:", response);
      router.push("/dashboard");
      onClose();
      reset();
      // Redirect or update UI state
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: error.message || "Login failed",
      });
    }
  };

  return (
    <AuthModal isOpen={isOpen} onClose={onClose} title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className={`block w-full px-3 py-2 sm:text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className={`block w-full px-3 py-2 sm:text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              id="remember-me"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </button>
        </div>

        {errors.root && (
          <p className="text-red-500 text-sm text-center">
            {errors.root.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthModal>
  );
};

export default LoginModal;
