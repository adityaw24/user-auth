import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const AuthModal = ({ isOpen, onClose, title, children }: AuthModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 transition-colors p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
