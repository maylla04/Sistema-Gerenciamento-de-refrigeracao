import Link from "next/link";
import { LayoutDashboard, Users, AirVent, Wrench } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="font-bold text-lg text-blue-700">AC Manager</h1>
          <p className="text-xs text-gray-500">Sistema de Refrigeração</p>
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/clientes"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            <Users size={18} />
            <span>Clientes</span>
          </Link>
          <Link
            href="/aparelhos"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            <AirVent size={18} />
            <span>Aparelhos</span>
          </Link>
          <Link
            href="/manutencoes"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            <Wrench size={18} />
            <span>Manutenções</span>
          </Link>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}