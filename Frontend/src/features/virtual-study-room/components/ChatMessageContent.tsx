import {
  getCleanFileName,
  getGroupFiles,
  openFile,
  type UploadResponse,
} from "../services/fileService";

const FILE_MESSAGE_PREFIX = "[STUDIFY_FILE]";

interface ChatFilePayload {
  storedName: string;
  displayName: string;
}

export function createFileChatMessage(
  file: UploadResponse["files"][number],
): string {
  return `${FILE_MESSAGE_PREFIX}${JSON.stringify({
    storedName: file.storedName,
    displayName: file.name,
  })}`;
}

function parseFileMessage(text: string): ChatFilePayload | null {
  if (!text.startsWith(FILE_MESSAGE_PREFIX)) return null;

  try {
    const payload: unknown = JSON.parse(text.slice(FILE_MESSAGE_PREFIX.length));
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("storedName" in payload) ||
      !("displayName" in payload) ||
      typeof payload.storedName !== "string" ||
      typeof payload.displayName !== "string"
    ) {
      return null;
    }
    return payload as ChatFilePayload;
  } catch {
    return null;
  }
}

export function ChatMessageContent({
  text,
  groupId,
}: {
  text: string;
  groupId: string;
}) {
  const file = parseFileMessage(text);
  const legacyDisplayName = text.startsWith("📎 Uploaded ")
    ? text.slice("📎 Uploaded ".length).trim()
    : null;

  if (!file && !legacyDisplayName) return <>{text}</>;

  const displayName = file?.displayName ?? legacyDisplayName ?? "file";

  const handleOpen = async () => {
    if (file) {
      openFile(groupId, file.storedName);
      return;
    }

    const files = await getGroupFiles(groupId);
    const match = files.find(
      (item) => getCleanFileName(item.name) === legacyDisplayName,
    );
    if (match) {
      openFile(groupId, match.name);
    } else {
      window.alert("This file could not be found in the group repository.");
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleOpen()}
      className="flex max-w-full items-center gap-2 text-left text-sky-700 hover:text-sky-900 hover:underline"
      title={`Open ${displayName}`}
    >
      <span aria-hidden="true">📎</span>
      <span className="truncate">{displayName}</span>
    </button>
  );
}
