import React, { useState } from "react";

interface CreatePollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePoll: (question: string, options: string[]) => void;
}

export const CreatePollModal: React.FC<CreatePollModalProps> = ({
  isOpen,
  onClose,
  onCreatePoll,
}) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = () => {
    setError("");

    if (!question.trim()) {
      setError("Please enter a poll question");
      return;
    }

    const filledOptions = options.filter((opt) => opt.trim());
    if (filledOptions.length < 2) {
      setError("Please add at least 2 options");
      return;
    }

    onCreatePoll(question, filledOptions);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setQuestion("");
    setOptions(["", ""]);
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-gray-900">Create a Poll</h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col gap-4">
          {/* Question Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-900">
              Poll Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to ask?"
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm focus:border-sky-700 focus:ring-1 focus:ring-sky-700 outline-none"
            />
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-gray-900">
              Options (2-6)
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full text-xs font-semibold text-gray-600">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm focus:border-sky-700 focus:ring-1 focus:ring-sky-700 outline-none"
                />
                {options.length > 2 && (
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}

            {options.length < 6 && (
              <button
                onClick={handleAddOption}
                className="mt-2 px-3 py-2 border-2 border-dashed border-slate-300 hover:border-sky-500 text-gray-700 hover:text-sky-700 font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Option
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="px-4 py-2 text-gray-700 font-medium text-sm rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePoll}
            className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-medium text-sm rounded-lg transition-colors"
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
};
