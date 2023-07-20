import React from "react";

type LoadingButtonProps = {
  type: "submit" | "button" | "reset";
  variant?: "default" | "danger";
  className?: string;
  disabled?: boolean;
  isLoading: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  type,
  variant = "default",
  className = "",
  disabled = false,
  isLoading,
  onClick,
  children,
}) => {
  const getButtonClassName = (): string => {
    let buttonClassName = `w-full p-2 text-white rounded-lg relative ${className}`;

    if (variant === "default") {
      buttonClassName += " bg-blue-500";
    } else if (variant === "danger") {
      buttonClassName += " bg-red-500";
    }

    return buttonClassName;
  };

  return (
    <button
      type={type}
      className={getButtonClassName()}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={{
        minHeight: "40px",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {isLoading ? (
        <div role="status" className="flex justify-center">
          <div className="w-6 h-6 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
          <div className="w-6 h-6 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
          <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
