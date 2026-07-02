import Link from "next/link";
import { AirVent, Wrench, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/user-info";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full px-10 py-5 flex items-center justify-between border-b border-blue-100">
        <div className="flex items-center gap-2">
          <AirVent className="text-blue-600" size={26} />
          <span className="font-bold text-xl text-blue-700">AC Manager</span>
        </div>
        <Link href="/login">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
            Entrar
          </Button>
        </Link>
      </header>
      <UserInfo />
      {/* Hero */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 py-28">
        <div className="flex items-center gap-2 bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-blue-100">
          <AirVent size={14} />
          Sistema de Gerenciamento de Refrigeração
        </div>

        <h1 className="text-5xl font-bold text-blue-700 max-w-2xl leading-tight mb-4">
          Gerencie suas manutenções com facilidade
        </h1>

        <p className="text-gray-400 text-lg max-w-lg mb-10">
          Cadastre clientes, aparelhos e manutenções. Receba alertas automáticos quando a próxima manutenção estiver se aproximando.
        </p>

        <Link href="/login">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 text-base"
          >
            Acessar o sistema
          </Button>
        </Link>
      </main>

      {/* Features */}
      <section className="w-full max-w-4xl mx-auto px-6 pb-28 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Users size={22} className="text-white" />
          </div>
          <h3 className="font-semibold text-blue-700">Gestão de Clientes</h3>
          <p className="text-sm text-gray-400">
            Cadastre e gerencie todos os seus clientes e aparelhos em um só lugar.
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Wrench size={22} className="text-white" />
          </div>
          <h3 className="font-semibold text-blue-700">Histórico de Manutenções</h3>
          <p className="text-sm text-gray-400">
            Registre cada serviço e mantenha um histórico completo por aparelho.
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Bell size={22} className="text-white" />
          </div>
          <h3 className="font-semibold text-blue-700">Alertas Automáticos</h3>
          <p className="text-sm text-gray-400">
            Seja avisado quando uma manutenção estiver próxima ou vencida.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-300 pb-6">
        AC Manager — Sistema de Gerenciamento de Refrigeração
      </footer>
    </div>
  );
}