"use client";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth } from "./store/authSlice";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearAuth());
    router.push("/login");
  };

  if (!token) {
    return (
      <div>
        <h1>Welcome Guest</h1>
        <button onClick={() => router.push("/login")}>Login</button>
        <button onClick={() => router.push("/signup")}>Signup</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user?.user_name}</h1>
      <button className="" onClick={handleLogout}>Logout</button>
      <button onClick={() => router.push("/notes")}>Go to Notes</button>
    </div>
  );
}
