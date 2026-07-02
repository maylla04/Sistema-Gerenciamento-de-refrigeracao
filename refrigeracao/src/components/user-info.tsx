"use client";

import { authClient } from "@/lib/auth-client";

export function UserInfo() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <p>Carregando...</p>;
  }

  if (!data) {
    return <p>Nenhum usuário logado.</p>;
  }

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-bold">
        Bem-vinda, {data.user.name} 👋
      </h2>

      <p>{data.user.email}</p>
    </div>
  );
}