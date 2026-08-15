import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
interface IconProps {
  className?: string;
}

interface FileItem {
  id: number;
  name: string;
  uploader: string;
  initials: string;
  avatarBg: string;
  date: string;
  type: string;
  iconBg: string;
  icon: React.ComponentType<IconProps>;
}

interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  fileName: string;
  errorMessage: string;
}

interface FileMetadata {
  typeLabel: string;
  icon: React.ComponentType<IconProps>;
  iconBg: string;
  isValidType: boolean;
}

// ==========================================
// 2. SVG ICON COMPONENTS
// ==========================================
const ArrowLeftIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const UploadIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const FileTextIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const MusicIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

const ImageIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const HardDriveIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2 4h.01M17 16h.01" />
  </svg>
);

const DownloadIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const TrendingUpIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const SearchIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const ChevronLeftIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const EyeIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

// Icon EyeOff (Mắt gạch chéo - Dùng khi ở trạng thái Hide)
const EyeOffIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.04 9.04 0 012.122-.363c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
  </svg>
);

const TrashIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const MoreVerticalIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

const CheckCircleIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XMarkIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ==========================================
// 3. CONSTANTS & UTILITIES
// ==========================================
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ITEMS_PER_PAGE = 4;

const ALLOWED_MIME_TYPES = [
  // Images
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  'text/markdown',
  // Video
  'video/mp4',
  'video/webm',
  'video/quicktime',
  // Audio
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
  'audio/ogg',
  'audio/mp4',
  'audio/aac',
  // Archives
  'application/zip',
  'application/x-rar-compressed',
  'application/x-7z-compressed',
  // Code & Data
  'application/json',
  'application/xml',
  'application/javascript',
  'text/html',
  'text/css',
  'text/javascript',
  'text/x-python',
  'text/x-java-source',
  'text/x-c',
  'text/x-c++',
  'text/x-ruby',
  'text/x-php',
  'text/x-sh'
];

const ALLOWED_EXTENSIONS = [
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.csv', '.md', '.rtf',
  '.mp3', '.wav', '.ogg', '.m4a', '.aac',
  '.mp4', '.webm', '.mov', '.avi', '.mkv',
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico',
  '.zip', '.rar', '.7z', '.tar', '.gz',
  '.json', '.xml', '.js', '.html', '.css', '.py', '.java', '.c', '.cpp', '.rb', '.php', '.sh'
];

const ACCEPT_ATTRIBUTE = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.md,.rtf,.mp3,.wav,.ogg,.m4a,.aac,.mp4,.webm,.mov,.avi,.mkv,.png,.jpg,.jpeg,.gif,.webp,.svg,.bmp,.ico,.zip,.rar,.7z,.tar,.gz,.json,.xml,.js,.html,.css,.py,.java,.c,.cpp,.rb,.php,.sh,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,audio/*,video/*,image/*";

const getFileMetadata = (file: File): FileMetadata => {
  const fileName = file.name || '';
  const mimeType = file.type || '';
  const extension = fileName.includes('.') 
    ? fileName.substring(fileName.lastIndexOf('.')).toLowerCase() 
    : '';

  const isPdf = extension === '.pdf' || mimeType === 'application/pdf';
  const isWord = ['.doc', '.docx'].includes(extension) || 
                 mimeType === 'application/msword' || 
                 mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const isSheet = ['.xls', '.xlsx'].includes(extension) || 
                  mimeType === 'application/vnd.ms-excel' || 
                  mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const isSlides = ['.ppt', '.pptx'].includes(extension) || 
                   mimeType === 'application/vnd.ms-powerpoint' || 
                   mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  const isText = ['.txt', '.csv', '.md', '.rtf'].includes(extension) || 
                 mimeType === 'text/plain' || 
                 mimeType === 'text/csv' || 
                 mimeType === 'text/markdown';
  const isVideo = ['.mp4', '.webm', '.mov', '.avi', '.mkv'].includes(extension) || mimeType.startsWith('video/');
  const isAudio = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'].includes(extension) || mimeType.startsWith('audio/');
  const isImage = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico'].includes(extension) || mimeType.startsWith('image/');
  const isArchive = ['.zip', '.rar', '.7z', '.tar', '.gz'].includes(extension) || 
                    mimeType === 'application/zip' || 
                    mimeType === 'application/x-rar-compressed' || 
                    mimeType === 'application/x-7z-compressed';
  const isCode = ['.json', '.xml', '.js', '.html', '.css', '.py', '.java', '.c', '.cpp', '.rb', '.php', '.sh'].includes(extension) || 
                 mimeType === 'application/json' || 
                 mimeType === 'application/xml' || 
                 mimeType === 'application/javascript' || 
                 mimeType === 'text/html' || 
                 mimeType === 'text/css' || 
                 mimeType === 'text/javascript' || 
                 mimeType === 'text/x-python' || 
                 mimeType === 'text/x-java-source' || 
                 mimeType === 'text/x-c' || 
                 mimeType === 'text/x-c++' || 
                 mimeType === 'text/x-ruby' || 
                 mimeType === 'text/x-php' || 
                 mimeType === 'text/x-sh';

  const isValidType = isPdf || isWord || isSheet || isSlides || isText || isVideo || isAudio || isImage || isArchive || isCode || 
                      ALLOWED_MIME_TYPES.includes(mimeType) || 
                      ALLOWED_EXTENSIONS.includes(extension);

  if (isPdf) {
    return {
      typeLabel: 'PDF Document',
      icon: FileTextIcon,
      iconBg: 'bg-red-50 text-red-600',
      isValidType
    };
  }
  if (isWord) {
    return {
      typeLabel: 'Word Document',
      icon: FileTextIcon,
      iconBg: 'bg-blue-50 text-blue-600',
      isValidType
    };
  }
  if (isSheet) {
    return {
      typeLabel: 'Spreadsheet',
      icon: FileTextIcon,
      iconBg: 'bg-emerald-50 text-emerald-600',
      isValidType
    };
  }
  if (isSlides) {
    return {
      typeLabel: 'Presentation',
      icon: FileTextIcon,
      iconBg: 'bg-orange-50 text-orange-600',
      isValidType
    };
  }
  if (isVideo) {
    return {
      typeLabel: 'Video File',
      icon: HardDriveIcon,
      iconBg: 'bg-rose-50 text-rose-600',
      isValidType
    };
  }
  if (isAudio) {
    return {
      typeLabel: 'Audio File',
      icon: MusicIcon,
      iconBg: 'bg-amber-50 text-amber-600',
      isValidType
    };
  }
  if (isImage) {
    return {
      typeLabel: 'Image',
      icon: ImageIcon,
      iconBg: 'bg-green-50 text-green-600',
      isValidType
    };
  }
  if (isArchive) {
    return {
      typeLabel: 'Archive',
      icon: HardDriveIcon,
      iconBg: 'bg-yellow-50 text-yellow-700',
      isValidType
    };
  }
  if (isCode) {
    return {
      typeLabel: 'Code File',
      icon: FileTextIcon,
      iconBg: 'bg-indigo-50 text-indigo-600',
      isValidType
    };
  }
  if (isText) {
    return {
      typeLabel: 'Text Document',
      icon: FileTextIcon,
      iconBg: 'bg-slate-50 text-slate-600',
      isValidType
    };
  }

  return {
    typeLabel: 'Document',
    icon: FileTextIcon,
    iconBg: 'bg-slate-50 text-slate-600',
    isValidType
  };
};

const INITIAL_FILES: FileItem[] = [
  { id: 1, name: 'C1 Vocabulary List.pdf', uploader: 'Alex Rivera', initials: 'AR', avatarBg: 'bg-blue-100 text-sky-700', date: 'Oct 24, 2023', type: 'PDF Document', iconBg: 'bg-red-50 text-red-600', icon: FileTextIcon },
  { id: 2, name: 'Debate Notes.docx', uploader: 'Tutor Mark', initials: 'TM', avatarBg: 'bg-purple-100 text-purple-600', date: 'Oct 22, 2023', type: 'Word Document', iconBg: 'bg-blue-50 text-blue-600', icon: FileTextIcon },
  { id: 3, name: 'Pronunciation_Exercise_B2.mp3', uploader: 'Alex Rivera', initials: 'AR', avatarBg: 'bg-blue-100 text-sky-700', date: 'Oct 19, 2023', type: 'Audio File', iconBg: 'bg-amber-50 text-amber-600', icon: MusicIcon },
  { id: 4, name: 'Grammar_Cheat_Sheet.png', uploader: 'Tutor Mark', initials: 'TM', avatarBg: 'bg-purple-100 text-purple-600', date: 'Oct 15, 2023', type: 'Image', iconBg: 'bg-green-50 text-green-600', icon: ImageIcon },
  { id: 5, name: 'IELTS Writing Task 2.pdf', uploader: 'Alex Rivera', initials: 'AR', avatarBg: 'bg-blue-100 text-sky-700', date: 'Oct 12, 2023', type: 'PDF Document', iconBg: 'bg-red-50 text-red-600', icon: FileTextIcon },
  { id: 6, name: 'Listening Mock Test 1.mp3', uploader: 'Tutor Mark', initials: 'TM', avatarBg: 'bg-purple-100 text-purple-600', date: 'Oct 10, 2023', type: 'Audio File', iconBg: 'bg-amber-50 text-amber-600', icon: MusicIcon },
  { id: 7, name: 'Speaking Sample Answers.docx', uploader: 'Alex Rivera', initials: 'AR', avatarBg: 'bg-blue-100 text-sky-700', date: 'Oct 08, 2023', type: 'Word Document', iconBg: 'bg-blue-50 text-blue-600', icon: FileTextIcon },
  { id: 8, name: 'Idioms_Infographic.png', uploader: 'Tutor Mark', initials: 'TM', avatarBg: 'bg-purple-100 text-purple-600', date: 'Oct 05, 2023', type: 'Image', iconBg: 'bg-green-50 text-green-600', icon: ImageIcon },
  { id: 9, name: 'Business English Phrases.pdf', uploader: 'Alex Rivera', initials: 'AR', avatarBg: 'bg-blue-100 text-sky-700', date: 'Oct 01, 2023', type: 'PDF Document', iconBg: 'bg-red-50 text-red-600', icon: FileTextIcon },
  { id: 10, name: 'Phonetics Chart.png', uploader: 'Tutor Mark', initials: 'TM', avatarBg: 'bg-purple-100 text-purple-600', date: 'Sep 28, 2023', type: 'Image', iconBg: 'bg-green-50 text-green-600', icon: ImageIcon },
  { id: 11, name: 'Podcast Session 04.mp3', uploader: 'Alex Rivera', initials: 'AR', avatarBg: 'bg-blue-100 text-sky-700', date: 'Sep 25, 2023', type: 'Audio File', iconBg: 'bg-amber-50 text-amber-600', icon: MusicIcon },
  { id: 12, name: 'Assignment_Feedback.docx', uploader: 'Tutor Mark', initials: 'TM', avatarBg: 'bg-purple-100 text-purple-600', date: 'Sep 20, 2023', type: 'Word Document', iconBg: 'bg-blue-50 text-blue-600', icon: FileTextIcon },
];

// ==========================================
// 4. MAIN COMPONENT
// ==========================================
export default function RepositoryUpload() {
  const [activeTab, setActiveTab] = useState<'All' | 'Documents' | 'Images' | 'Audio'>('All');
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  // States quản lý ẩn file & Popup More Options
  const [hiddenFileIds, setHiddenFileIds] = useState<number[]>([]);
  const [activeMenuFileId, setActiveMenuFileId] = useState<number | null>(null);
  const [uploadState, setUploadState] = useState<{
    status: 'idle' | 'uploading' | 'success' | 'error';
    progress: number;
    fileName: string;
    errorMessage: string;
  }>({
    status: 'idle',
    progress: 0,
    fileName: '',
    errorMessage: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const uploadIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragCounterRef = useRef<number>(0);

  const clearActiveInterval = useCallback(() => {
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearActiveInterval();
    };
  }, [clearActiveInterval]);

  // Tự động căn chỉnh phân trang nếu trang hiện tại bị rỗng khi xóa file
  useEffect(() => {
    const maxPage = Math.ceil(files.length / ITEMS_PER_PAGE) || 1;
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [files.length, currentPage]);

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetUploadState = () => {
    clearActiveInterval();
    setUploadState({ status: 'idle', progress: 0, fileName: '', errorMessage: '' });
  };

  // Toggle hiệu ứng Hide / Show cho file
  const toggleHideFile = (id: number) => {
    setHiddenFileIds((prev) =>
      prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]
    );
  };

  // Xóa file khỏi danh sách
  const handleDeleteFile = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
    setActiveMenuFileId(null);
  };

  // Tải file giả lập
  const handleDownloadFile = (fileName: string) => {
    const element = document.createElement("a");
    const file = new Blob(["Sample study content"], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setActiveMenuFileId(null);
  };

  const processFile = (file: File) => {
    if (!file) return;

    clearActiveInterval();
    const metadata = getFileMetadata(file);

    if (!metadata.isValidType) {
      setUploadState({
        status: 'error',
        progress: 0,
        fileName: file.name,
        errorMessage: 'Unsupported file format. Please upload PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV, MP3, WAV, MP4, images, archives, or code files.'
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadState({
        status: 'error',
        progress: 0,
        fileName: file.name,
        errorMessage: 'File size exceeds 50MB limit. Please choose a smaller file.'
      });
      return;
    }

    setUploadState({
      status: 'uploading',
      progress: 0,
      fileName: file.name,
      errorMessage: ''
    });

    let currentProgress = 0;

    uploadIntervalRef.current = setInterval(() => {
      currentProgress += 25;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearActiveInterval();

        const isSimulatedError = file.name.toLowerCase().includes('error') || file.name.toLowerCase().includes('fail');

        if (isSimulatedError) {
          setUploadState({
            status: 'error',
            progress: 100,
            fileName: file.name,
            errorMessage: 'Failed to upload file due to a network connection error.'
          });
        } else {
          setUploadState({
            status: 'success',
            progress: 100,
            fileName: file.name,
            errorMessage: ''
          });

          const newFileObj: FileItem = {
            id: Date.now(),
            name: file.name,
            uploader: 'Alex Rivera',
            initials: 'AR',
            avatarBg: 'bg-blue-100 text-sky-700',
            date: 'Just now',
            type: metadata.typeLabel,
            iconBg: metadata.iconBg,
            icon: metadata.icon
          };

          setFiles((prev) => [newFileObj, ...prev]);
          setCurrentPage(1);
        }
      } else {
        setUploadState((prev) => ({ ...prev, progress: currentProgress }));
      }
    }, 200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFile(selectedFiles[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragActive(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    dragCounterRef.current = 0;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 150);
  };

  const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);

  const currentTableData = files.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6 font-sans text-gray-900">
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept={ACCEPT_ATTRIBUTE}
        className="hidden" 
      />

      {/* Top Navigation */}
      <div>
        <button 
          onClick={() => navigate(`/study-groups/${groupId}/workspace`)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-sky-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors -ml-3"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Workspace</span>
        </button>
      </div>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="!text-3xl !font-bold !text-gray-900">Study Repository</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage and access your English learning materials and session notes.
          </p>
        </div>
      </header>

      {/* Upload Progress & Alert Section */}
      {uploadState.status === 'uploading' && (
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl space-y-2">
          <div className="flex justify-between text-xs font-semibold text-sky-900">
            <span>Uploading: {uploadState.fileName}...</span>
            <span>{uploadState.progress}%</span>
          </div>
          <div className="w-full bg-sky-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-sky-700 h-full transition-all duration-200 ease-out" 
              style={{ width: `${uploadState.progress}%` }} 
            />
          </div>
        </div>
      )}

      {uploadState.status === 'success' && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start justify-between gap-3 text-emerald-900 transition-all">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold">Upload Successful!</h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                File <span className="font-medium underline">{uploadState.fileName}</span> has been added to your repository.
              </p>
            </div>
          </div>
          <button 
            onClick={resetUploadState}
            className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-700 transition-colors"
            title="Dismiss"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {uploadState.status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start justify-between gap-3 text-red-900 transition-all">
          <div className="flex items-center gap-3">
            <XCircleIcon className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold">Upload Failed</h4>
              <p className="text-xs text-red-700 mt-0.5">
                {uploadState.errorMessage}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={triggerFileSelect}
              className="px-3 py-1 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Retry
            </button>
            <button 
              onClick={resetUploadState}
              className="p-1 hover:bg-red-100 rounded-lg text-red-700 transition-colors"
              title="Dismiss"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Bento Layout Zone */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dropzone Container */}
        <div 
          onClick={triggerFileSelect}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`lg:col-span-2 p-8 border-2 border-dashed rounded-xl flex flex-col justify-center items-center text-center transition-colors cursor-pointer group ${
            isDragActive 
              ? 'border-sky-600 bg-sky-50/50 scale-[0.99]' 
              : 'border-slate-300 bg-slate-50 hover:border-sky-500 hover:bg-slate-100/50'
          }`}
        >
          <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <UploadIcon className="w-6 h-6 text-sky-700" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Drop files to upload</h3>
          <p className="text-sm text-gray-500 mt-1">
            Support for PDF, DOC, DOCX, XLS, PPT, MP3, MP4, images, archives, and more up to 50MB
          </p>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerFileSelect();
            }}
            className="cursor-pointer mt-5 px-4 py-2 border border-sky-700 text-sky-700 hover:bg-sky-50 rounded-lg text-sm font-medium transition-colors"
          >
            Browse Files
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="space-y-6">
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <HardDriveIcon className="w-5 h-5 text-sky-700" />
              <span className="px-2 py-0.5 bg-blue-100 text-sky-800 text-xs font-semibold rounded">
                2.4 GB / 5 GB
              </span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Storage Used</h4>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-sky-700 h-full w-[48%]" />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              You have used <span className="font-semibold text-gray-700">48%</span> of your monthly allowance.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <DownloadIcon className="w-5 h-5 text-emerald-700" />
              <span className="text-xs text-gray-500">Last 30 Days</span>
            </div>
            <h4 className="text-sm font-semibold text-gray-900">Total Downloads</h4>
            <div className="text-3xl font-bold text-gray-900">128</div>
            <div className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
              <TrendingUpIcon className="w-3.5 h-3.5" />
              <span>12% increase from last month</span>
            </div>
          </div>
        </div>
      </section>

      {/* Files Table Section */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="px-6 py-4 bg-indigo-50/50 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xs font-bold text-gray-900 tracking-wider uppercase">
            All Files
          </h2>
          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-slate-100 rounded-lg transition-colors">
              <SearchIcon className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-slate-100 rounded-lg transition-colors">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto min-h-[220px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-gray-600 text-xs font-medium uppercase border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3">File Name</th>
                <th scope="col" className="px-6 py-3">Uploaded By</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className={`divide-y divide-slate-200 transition-all duration-200 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
            }`}>
              {currentTableData.map((file) => {
                const IconComponent = file.icon;
                const isHidden = hiddenFileIds.includes(file.id);

                return (
                  <tr 
                    key={file.id} 
                    className={`transition-all duration-200 ${
                      isHidden 
                        ? 'opacity-40 bg-slate-100/60 grayscale-[50%]' 
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${file.iconBg}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className={`font-semibold text-gray-900 ${isHidden ? 'line-through text-gray-500' : ''}`}>
                          {file.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${file.avatarBg}`}>
                          {file.initials}
                        </span>
                        <span className="text-gray-700">{file.uploader}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {file.date}
                    </td>

                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {file.type}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 relative">
                        
                        {/* Nut Eye / Hide Eye Icon */}
                        <button 
                          onClick={() => toggleHideFile(file.id)}
                          className={`p-1.5 rounded-full transition-colors ${
                            isHidden 
                              ? 'text-amber-600 hover:bg-amber-100 bg-amber-50' 
                              : 'text-gray-500 hover:text-gray-800 hover:bg-slate-200'
                          }`}
                          title={isHidden ? "Unhide file" : "Hide file"}
                        >
                          {isHidden ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                        </button>

                        {/* More Vertical Options */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuFileId(activeMenuFileId === file.id ? null : file.id);
                          }}
                          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-slate-200 rounded-full transition-colors"
                          title="More options"
                        >
                          <MoreVerticalIcon className="w-4 h-4" />
                        </button>

                        {/* Dropdown Popup Menu */}
                        {activeMenuFileId === file.id && (
                          <>
                            {/* Backdrop de clore popup khi click ngoai */}
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setActiveMenuFileId(null)} 
                            />

                            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-200 z-20 py-1.5 text-left transition-all">
                              <button
                                onClick={() => handleDownloadFile(file.name)}
                                className="w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-2.5 transition-colors"
                              >
                                <DownloadIcon className="w-4 h-4 text-gray-500" />
                                <span>Download file</span>
                              </button>

                              <button
                                onClick={() => handleDeleteFile(file.id)}
                                className="w-full px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                              >
                                <TrashIcon className="w-4 h-4 text-red-500" />
                                <span>Delete file</span>
                              </button>
                            </div>
                          </>
                        )}

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-gray-600">
          <div>
            Showing <span className="font-semibold text-gray-900">
              {files.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, files.length)}
            </span> of <span className="font-semibold text-gray-900">{files.length}</span> files
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1.5 border border-slate-300 rounded-lg transition-colors ${
                currentPage === 1 
                  ? 'opacity-40 cursor-not-allowed bg-slate-100' 
                  : 'hover:bg-white text-gray-800 active:bg-slate-200'
              }`}
              title="Previous Page"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>

            <span className="text-xs font-medium text-gray-700 px-2">
              {currentPage} / {totalPages || 1}
            </span>

            <button 
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`p-1.5 border border-slate-300 rounded-lg transition-colors ${
                currentPage === totalPages || totalPages === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100' 
                  : 'hover:bg-white text-gray-800 active:bg-slate-200'
              }`}
              title="Next Page"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}