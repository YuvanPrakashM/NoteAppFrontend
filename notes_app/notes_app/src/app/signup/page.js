"use client";
import { useState } from "react";
import api from "../utils/api";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({ user_email: "", user_name: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("api/users/register/", form);
      router.push("/login");
    } catch (err) {
      console.error("Signup failed", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          type="text"
          value={form.user_name}
          onChange={(e) => setForm({ ...form, user_name: e.target.value })}
        />
        <input
          placeholder="Email"
          type="email"
          value={form.user_email}
          onChange={(e) => setForm({ ...form, user_email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
