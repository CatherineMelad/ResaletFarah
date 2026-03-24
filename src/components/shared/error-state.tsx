interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="w-full h-[25vh] md:h-[40vh] lg:h-[60vh] flex flex-col items-center justify-center text-center gap-4">
      <p className="text-red-600 font-medium">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}