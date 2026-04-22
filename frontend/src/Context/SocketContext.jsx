import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { UserDataContext } from "./UserContext";
import { CaptainDataContext } from "./CaptainContext";

const SocketContext = createContext(null);

let socket = null;

export const SocketProvider = ({ children }) => {
  const { user } = useContext(UserDataContext);
  const { captain } = useContext(CaptainDataContext);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let id = null;
    let role = null;

    if (user?._id) {
      id = user._id;
      role = "user";
    } else if (captain?._id) {
      id = captain._id;
      role = "captain";
    }

    if (id && role) {
      socket = io(`${import.meta.env.VITE_BASE_URL}`, {
        query: { id, role } 
      });

      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("❌ Socket disconnected");
        setIsConnected(false);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [user?._id, captain?._id]);

  // 🔹 send message
  const sendMessage = (eventName, data) => {
    if (socket) {
      socket.emit(eventName, data);
    }
  };

  // 🔹 receive message
  const receiveMessage = (eventName, callback) => {
    if (socket) {
      socket.on(eventName, callback);
    }
  };

  return (
    <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

// custom hook
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};