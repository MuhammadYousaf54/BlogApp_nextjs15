"use client";
import { useEffect, useState } from "react";
import Navlinks from "../components/Navlinks";
import { logout } from "./actions/auth";

export default function ClientNavlinks() {
  const [authUser, setAuthUser] = useState(null);
  
  useEffect(() => {
    async function fetchAuthUser() {
      try {
        const res = await fetch("/api/auth", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        setAuthUser(data.user);
      } catch (error) {
        console.error("Error fetching auth user:", error);
      }
    }

    fetchAuthUser();
  }, []);

  return (
    <>
      <Navlinks label="Home" href="/" />
     

      <div>
        {authUser ? (
          <div className="flex float-start items-center ">
            <Navlinks label="Dashboard" href="/dashboard" />
            <Navlinks label="Post Create" href="/posts/create" />
            <form action={logout} >
              <button className="nav-link">Logout</button>
            </form>

            
          </div>
        ) : (
          <div>
            <Navlinks label="Register" href="/register" />
            <Navlinks label="Login" href="/login" />
          </div>
        )}
      </div>
    </>
  );
}
