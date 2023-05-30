import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import SocketContext from "./socket";

const SocketProvider = (props) => {
  const { data: session, status } = useSession();

  const [value, setValue] = useState();
  useEffect(() => {
    if (status === "authenticated") {
      socketInitializer();
    }

    return () => {
      if (value) {
        value.disconnect();
      }
    };
  }, [status]);
  const socketInitializer = () => {
    const socket = io(process.env.ENDPOINT_SERVER, {
      auth: {
        token: `Bearer ${session.user.accessToken}`,
      },
    });

    socket.on("connect_error", (err) => {
      console.log("error", err);
      toast.error(err.message);
    });
    setValue(socket);
  };
  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
};
export default SocketProvider;
