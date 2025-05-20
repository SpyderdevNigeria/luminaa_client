/* eslint-disable @typescript-eslint/no-explicit-any */

const FeedbackMessage = ({ message, type }: any) => {
  return (
    <div
      className={`p-4 rounded-md my-2 border-l-4 text-sm ${
        type === 'success' ? 'bg-green-100 text-green-700 border-l-green-400' : 'bg-red-100 text-red-700 border-l-red-400'
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default FeedbackMessage;
