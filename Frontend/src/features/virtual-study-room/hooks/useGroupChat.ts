import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../../auth/store/useAuthStore';

const API_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/+$/, '');
const TEMP_GROUP_ID = 'LP-B2-99';

export interface GroupChatSender {
  id: number;
  name: string;
  avatar?: string | null;
}

export interface GroupChatMessage {
  id: number;
  groupId: string;
  senderId: number;
  text: string;
  createdAt: string;
  updatedAt?: string;
  sender?: GroupChatSender;
}

export function useGroupChat(groupId = TEMP_GROUP_ID) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const [messages, setMessages] = useState<GroupChatMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const normalizedToken = token?.replace(/^"|"$/g, '').replace(/^Bearer\s+/i, '') ?? '';

  useEffect(() => {
    let isMounted = true;

    axios
      .get<GroupChatMessage[]>(`${API_BASE}/chat/group/${groupId}`, {
        headers: {
          Authorization: `Bearer ${normalizedToken}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
      
      .then(({ data }) => {
        if (isMounted) {
          setMessages(data);
        }
      })
      .catch((error) => {
        console.error('Load chat history error:', error);
      });

    return () => {
      isMounted = false;
    };
  }, [groupId, normalizedToken]);

  useEffect(() => {
    const socket = io(`${API_BASE}/chat`, {
      // Start with WebSocket so ngrok does not intercept Socket.IO's HTTP
      // polling handshake with its free-tier browser warning page.
      transports: ['websocket', 'polling'],
      auth: {
        token: normalizedToken,
      },
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      setError(null);
      socket.emit('joinGroup', groupId);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('newMessage', (message: GroupChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('connect_error', (error) => {
      console.error('Connect error:', error.message);
      setError(error.message || 'Unable to connect to group chat');
    });

    return () => {
      socket.disconnect();
    };
  }, [groupId, normalizedToken]);

  useEffect(() => {
    socketRef.current?.emit('joinGroup', groupId);
  }, [groupId, normalizedToken]);

  const sendMessage = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text.trim()) {
        return false;
      }

      const socket = socketRef.current;
      if (!socket?.connected) {
        setError('Chat is disconnected. Please try again.');
        return false;
      }

      try {
        const response = await socket.timeout(5000).emitWithAck('sendMessage', {
          groupId,
          text: text.trim(),
        });
        if (response?.error) {
          setError(response.error);
          return false;
        }
        setError(null);
        return true;
      } catch {
        setError('Message could not be sent. Please try again.');
        return false;
      }
    },
    [groupId],
  );

  return {
    messages,
    sendMessage,
    connected,
    error,
    currentUserId: user?.id ?? null,
  };
}
