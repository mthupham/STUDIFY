import { useEffect, useRef } from "react";

interface EmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
}

const EMOJIS = [
  "😀", "😃", "😄", "😁", "😂", "😊", "😍", "🥰",
  "😎", "🤔", "😅", "😭", "😡", "👍", "👎", "👏",
  "🙌", "🙏", "💪", "🎉", "❤️", "🔥", "✨", "✅",
];

export function EmojiPicker({ isOpen, onClose, onSelect }: EmojiPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={pickerRef}
      className="absolute bottom-11 left-0 z-30 grid w-64 grid-cols-8 gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
      role="dialog"
      aria-label="Choose an emoji"
    >
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-lg hover:bg-slate-100"
          aria-label={`Insert ${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
