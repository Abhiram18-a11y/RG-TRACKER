import { useState } from "react";
import "./ChatBot.css";

interface Message {
  from: "user" | "bot";
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const query = input.toLowerCase();
    let botResponse = "❌ Sorry, I couldn't understand your request.";

    // ✅ Extract time (supports "11:30", "11 pm", "11:30 am")
    const timeMatch = query.match(/at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);

    let timeAsked: string | null = null;
    if (timeMatch) {
      let hours = parseInt(timeMatch[1], 10);
      let minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
      const meridian = timeMatch[3]?.toLowerCase();

      if (meridian) {
        if (meridian === "pm" && hours < 12) hours += 12;
        if (meridian === "am" && hours === 12) hours = 0;
      }
      timeAsked = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    }

    // ✅ Gate schedules (mocked)
    const gateSchedules: Record<string, { open: string; close: string }> = {
      hyderabad: { open: "06:00", close: "22:00" },
      mumbai: { open: "05:30", close: "20:30" },
      chennai: { open: "07:00", close: "21:00" },
      bhimavaram: { open: "06:30", close: "19:30" },
    };

    const foundCity = Object.keys(gateSchedules).find((city) =>
      query.includes(city)
    );

    if (foundCity) {
      const { open, close } = gateSchedules[foundCity];

      if (timeAsked) {
        const asked = new Date(`1970-01-01T${timeAsked}:00`);
        const openT = new Date(`1970-01-01T${open}:00`);
        const closeT = new Date(`1970-01-01T${close}:00`);

        if (asked >= openT && asked <= closeT) {
          botResponse = `✅ ${capitalize(
            foundCity
          )} Gate will be OPEN at ${formatTime(timeAsked)}.`;
        } else {
          botResponse = `🚦 ${capitalize(
            foundCity
          )} Gate will be CLOSED at ${formatTime(timeAsked)}.`;
        }
      } else {
        botResponse = `ℹ️ ${capitalize(
          foundCity
        )} Gate is usually open between ${formatTime(open)} and ${formatTime(
          close
        )}.`;
      }
    }

    setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
    setInput("");
  };

  // ✅ Helpers
  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const meridian = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${meridian}`;
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating bubble */}
      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">Railway Gate Assistant</div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder='Ask: "Hyderabad at 11 pm"...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
