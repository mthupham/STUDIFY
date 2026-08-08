import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../../auth/store/useAuthStore';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
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
  const [messages, setMessages] = useState<GroupChatMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get<GroupChatMessage[]>(`${API_BASE}/chat/group/${groupId}`)
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
  }, [groupId]);

  useEffect(() => {
    const socket = io(`${API_BASE}/chat`);
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
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
    });

    return () => {
      socket.disconnect();
    };
  }, [groupId]);

  useEffect(() => {
    socketRef.current?.emit('joinGroup', groupId);
  }, [groupId]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) {
        return;
      }

      socketRef.current?.emit('sendMessage', {
        groupId,
        senderId: user?.id ?? 1,
        text: text.trim(),
      });
    },
    [groupId, user?.id],
  );

  return {
    messages,
    sendMessage,
    connected,
    currentUserId: user?.id ?? null,
  };
}