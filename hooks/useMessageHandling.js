import { useState, useRef, useEffect } from "react";

/**
 * Custom hook for centralizing all message-related logic
 * Handles: file uploads, audio recording, emoji picking, and menu management
 */
export const useMessageHandling = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  // Refs for UI
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);
  const emojiRef = useRef(null);

  // Refs for Audio Logic
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Convert file to Base64 and trigger callback
   */
  const processFile = (file, onSendFile) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = {
        type: file.type.startsWith("image") ? "image" : "file",
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        data: e.target.result,
        rawFile: file,
      };
      onSendFile?.(fileData);
    };
    reader.readAsDataURL(file);
  };

  const handleImageSelect = (e, onSendFile) => {
    processFile(e.target.files[0], onSendFile);
    setShowMenu(false);
  };

  const handleFileSelect = (e, onSendFile) => {
    processFile(e.target.files[0], onSendFile);
    setShowMenu(false);
  };

  /**
   * Audio Recording
   */
  const startRecording = async (onSendFile) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          onSendFile?.({
            type: "audio",
            name: "voice_note.webm",
            size: (audioBlob.size / 1024).toFixed(2) + " KB",
            data: reader.result,
          });
        };
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access denied or not available.");
    }
  };

  const stopAndSendRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    setIsRecording(false);
    clearInterval(timerRef.current);
    setRecordingDuration(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleEmojiClick = (emojiObject, value, onChange) => {
    onChange?.(value + emojiObject.emoji);
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
    setShowMenu(false);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
    setShowMenu(false);
  };

  return {
    // State
    showMenu,
    setShowMenu,
    showEmoji,
    setShowEmoji,
    isRecording,
    recordingDuration,

    // Refs
    imageInputRef,
    fileInputRef,
    menuRef,
    emojiRef,

    // Handlers
    handleImageSelect,
    handleFileSelect,
    startRecording,
    stopAndSendRecording,
    cancelRecording,
    formatTime,
    handleEmojiClick,
    handleImageClick,
    handleFileClick,
  };
};
