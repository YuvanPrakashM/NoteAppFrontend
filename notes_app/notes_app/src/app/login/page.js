"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import api from "../utils/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ user_email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("users/login/", form);
      dispatch(setAuth({ token: res.data.token, user: res.data.user }));
      router.push("/notes");
    } catch (err) {
      console.error("Login failed", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
