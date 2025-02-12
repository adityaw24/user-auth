import { useForm } from "react-hook-form";
import AuthModal from "./AuthModal";
import { AuthService } from "~/services/auth.service";
import { RegisterPayload } from "~/types/auth.type";
import { useRouter } from "next/navigation";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const password = watch("password");

  const onSubmit = async (data: RegisterPayload) => {
    // console.log("Register:", data);
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      const response = await AuthService.register(data);
      console.log("Register successful:", response);
      router.push("/dashboard");
      onClose();
      reset();
      // Redirect or update UI state
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: error.message || "Registration failed",
      });
    }
  };

  return (
    <AuthModal isOpen={isOpen} onClose={onClose} title="Create Account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className={`block w-full px-3 py-2 sm:text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            className={`block w-full px-3 py-2 sm:text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

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
            Phone
          </label>
          <input
            type="text"
            className={`block w-full px-3 py-2 sm:text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^\d/,
                message: "Invalid phone number",
              },
            })}
            onChange={(e) => {
              const input = e.target.value;
              const formattedInput = input.replace(/\D/g, ""); // Remove non-numeric characters
              e.target.value = formattedInput;
            }}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
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
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Password must contain at least one letter and one digit",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className={`block w-full px-3 py-2 sm:text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
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
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </AuthModal>
  );
};

export default RegisterModal;
