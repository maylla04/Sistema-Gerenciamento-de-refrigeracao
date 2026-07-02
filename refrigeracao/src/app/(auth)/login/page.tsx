"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert(`Bem-vinda ${data.user.name}!`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex w-96 flex-col gap-4 rounded-xl border p-8 shadow">

        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input
          placeholder="E-mail"
          className="rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="rounded bg-blue-600 p-2 text-white"
        >
          Entrar
        </button>

      </div>
    </main>
  );
}