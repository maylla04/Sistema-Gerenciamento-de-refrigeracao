"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, AirVent, Wrench, AlertTriangle } from "lucide-react";

type Manutencao = {
  id: number;
  clienteNome: string;
  aparelho: string;
  proximaData: string;
};

function calcularStatus(proximaData: string): {
  label: string;
  dias: number;
  variant: "default" | "secondary" | "destructive";
} {
  const hoje = new Date();
  const proxima = new Date(proximaData);
  const dias = Math.ceil((proxima.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

  if (dias < 0) return { label: "Vencido", dias, variant: "destructive" };
  if (dias <= 30) return { label: "Atenção", dias, variant: "secondary" };
  return { label: "Ok", dias, variant: "default" };
}

const manutencoesExemplo: Manutencao[] = [
  { id: 1, clienteNome: "João Silva", aparelho: "Samsung 12000 BTU", proximaData: "2026-06-10" },
  { id: 2, clienteNome: "Maria Souza", aparelho: "LG 9000 BTU", proximaData: "2026-07-15" },
  { id: 3, clienteNome: "Carlos Lima", aparelho: "Midea 18000 BTU", proximaData: "2026-05-01" },
];

export default function DashboardPage() {
  const [manutencoes] = useState<Manutencao[]>(manutencoesExemplo);

  const vencidas = manutencoes.filter((m) => calcularStatus(m.proximaData).label === "Vencido");
  const atencao = manutencoes.filter((m) => calcularStatus(m.proximaData).label === "Atenção");
  const alertas = vencidas.length + atencao.length;

  const ordenadas = [...manutencoes].sort(
    (a, b) => new Date(a.proximaData).getTime() - new Date(b.proximaData).getTime()
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 mt-1 mb-6">Visão geral do sistema.</p>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Clientes</CardTitle>
            <Users size={18} className="text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Aparelhos Ativos</CardTitle>
            <AirVent size={18} className="text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Manutenções</CardTitle>
            <Wrench size={18} className="text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{manutencoes.length}</p>
          </CardContent>
        </Card>

        <Card className={alertas > 0 ? "border-red-300" : ""}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Alertas</CardTitle>
            <AlertTriangle size={18} className={alertas > 0 ? "text-red-500" : "text-gray-400"} />
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${alertas > 0 ? "text-red-500" : ""}`}>{alertas}</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de próximas manutenções */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Próximas Manutenções</h2>
      <div className="flex flex-col gap-3">
        {ordenadas.map((m) => {
          const status = calcularStatus(m.proximaData);
          return (
            <Card key={m.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-gray-800">{m.clienteNome}</p>
                  <p className="text-sm text-gray-500">{m.aparelho}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500">
                    {new Date(m.proximaData).toLocaleDateString("pt-BR")}
                  </p>
                  <Badge variant={status.variant}>
                    {status.label} {status.dias >= 0 ? `(${status.dias}d)` : `(${Math.abs(status.dias)}d atrás)`}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}