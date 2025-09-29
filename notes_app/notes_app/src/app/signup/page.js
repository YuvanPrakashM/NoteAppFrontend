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
    <div className="login-container">
    <div className="login-box">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          type="text"
          className="fields"
          value={form.user_name}
          onChange={(e) => setForm({ ...form, user_name: e.target.value })}
        />
        <input
          placeholder="Email"
          type="email"
          className="fields"
          value={form.user_email}
          onChange={(e) => setForm({ ...form, user_email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="fields"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="register-btn" type="submit">Signup</button>
      </form>
    </div>
    </div>
  );
}
