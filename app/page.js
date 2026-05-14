"use client";
import { useState } from "react";

const agents = [
  "Instagram Expert",
  "SEO Writer",
  "YouTube Script Writer",
  "Insurance Advisor",
  "Marketing Expert"
];

export default function Home() {
  const [message, setMessage] = useState("");
  const [agent, setAgent] = useState(agents[0]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        agent
      })
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  return (
    <main style={{maxWidth:'900px',margin:'auto',padding:'40px'}}>
      <h1 style={{fontSize:'40px',fontWeight:'bold'}}>
        AI Agency Website
      </h1>

      <p>Create content using AI agents</p>

      <select
        value={agent}
        onChange={(e)=>setAgent(e.target.value)}
        style={{
          width:'100%',
          padding:'14px',
          marginTop:'20px',
          borderRadius:'10px'
        }}
      >
        {agents.map((a)=>(
          <option key={a}>{a}</option>
        ))}
      </select>

      <textarea
        placeholder="Type your prompt..."
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        style={{
          width:'100%',
          height:'180px',
          marginTop:'20px',
          padding:'15px',
          borderRadius:'10px'
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding:'15px 30px',
          marginTop:'20px',
          borderRadius:'10px',
          background:'#2563eb',
          color:'white',
          border:'none',
          cursor:'pointer'
        }}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <div
        style={{
          marginTop:'30px',
          background:'#1e293b',
          padding:'20px',
          borderRadius:'10px',
          whiteSpace:'pre-wrap'
        }}
      >
        {response}
      </div>
    </main>
  );
}