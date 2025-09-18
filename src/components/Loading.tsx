import React from "react";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Carregando...",
  fullScreen = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "h-screen w-screen" : "p-4"
      }`}
    >
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Mensagem opcional */}
      <p className="mt-4 text-gray-600 text-sm">{message}</p>
    </div>
  );
};

export default Loading;
