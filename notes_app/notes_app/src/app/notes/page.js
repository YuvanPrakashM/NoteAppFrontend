"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import api from "../utils/api";

export default function NotesPage() {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ note_title: "", note_content: "" });


  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      fetchNotes();
    }
  }, [token]);

 
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err.response?.data || err.message);
    }
  };

  
  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      await api.post("/notes/", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ note_title: "", note_content: "" });
      fetchNotes(); 
    } catch (err) {
      console.error("Failed to add note", err.response?.data || err.message);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error("Failed to delete note", err.response?.data || err.message);
    }
  };

  if (!token) return <p>Redirecting...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Notes</h1>

      
      <form onSubmit={handleAddNote} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={form.note_title}
          onChange={(e) => setForm({ ...form, note_title: e.target.value })}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Content"
          value={form.note_content}
          onChange={(e) => setForm({ ...form, note_content: e.target.value })}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add Note</button>
      </form>

      
      <ul>
        {notes.map((note) => (
          <li
            key={note.note_id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{note.note_title}</h3>
            <p>{note.note_content}</p>
            <button onClick={() => handleDelete(note.note_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
