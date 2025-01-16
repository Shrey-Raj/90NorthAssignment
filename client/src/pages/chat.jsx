import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthGuard from "../services/AuthGuard";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CollapsibleLeftPanel from "./components/LeftPanel";

function Chat() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const navigate = useNavigate();

  const storedData = localStorage.getItem("user");
  const userData = JSON.parse(storedData);
  const accessToken = userData.access;
  const userEmail = userData.email;
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    console.log("Messages:", messages);
    console.log("all users = " , allUsers); 
  }, [messages, allUsers]);


  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setAllUsers(response.data);
        console.log("All Users:", response.data);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchAllUsers();
  }, [accessToken]);

  


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/accept-interest/",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    if (selectedUser) {
      const ws = new WebSocket(
        `ws://localhost:8000/ws/chat/?token=${accessToken}&recipient=${selectedUser.id}`
      );
      ws.onopen = () => setSocket(ws);
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "websocket_connected") {
          setRoomName(data.room);
        } else {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      };
      ws.onclose = () => console.log("WebSocket connection closed");
      return () => ws.close();
    }
  }, [accessToken, selectedUser]);

  const handleUserClick = (user) => {
    console.log("user clicked = ", user);
    setSelectedUser(user);
    fetchMessageHistory(user.id);
  };

  const fetchMessageHistory = async (receiverId) => {
    try {
      // Fetch message history logic
    } catch (error) {
      console.error("Error fetching message history:", error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && message.trim() !== "" && roomName) {
      socket.send(
        JSON.stringify({
          receiver: selectedUser.id,
          message: message,
          sender: accessToken,
          roomname: roomName,
        })
      );
      setMessage("");
    }
  };

  return (
    <>
      {/* Navbar */}

      <div className="d-flex">
        <Navbar
          leftPanelOpen={leftPanelOpen}
          setLeftPanelOpen={setLeftPanelOpen}
          navigate={navigate}
        />

        {/* Left Panel */}
        <CollapsibleLeftPanel
          open={leftPanelOpen}
          onClose={() => setLeftPanelOpen(false)}
        />

        {/* Main Content */}
        <div className="container-fluid p-5 mt-5">
          <div className="row ">
            {/* Members List */}
            <div className="col-md-4">
              <h5>Members</h5>
              {users.length > 0 ? (
                users.map((item) => {
                  const isSender = item.sender.email === userEmail;
                  const user = isSender ? item.receiver : item.sender;
                  return (
                    <div
                      style={{ cursor: "pointer", backgroundColor: selectedUser && selectedUser.id === user.id ? "lightgray" : "white" }}
                      className="card mb-2 border"
                      key={user.id}
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="card-body">
                        <h6>{user.username}</h6>
                        <p className="text-muted">{user.email}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="quicksand">No users to show.</p>
              )}
            </div>

            {/* Chat Box */}
            <div className="col-md-8">
              <div className="rounded shadow-sm p-3" style={{"backgroundColor" : "#F8FAFC"}}>
                <h5>Chat</h5>
                <div className="chat-messages">
                  {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                      <strong>
                      {allUsers.find(user => user.id === msg.sender)?.username || 'Unknown'}
                      {/* {userData.username} */}
                      </strong>: {msg.message}
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthGuard(Chat);
