"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Wrench, Calendar } from "lucide-react";

type Manutencao = {
  id: number;
  clienteNome: string;
  aparelho: string;
  tipoServico: string;
  dataRealizada: string;
  proximaData: string;
  observacoes: string;
};

function calcularStatus(proximaData: string): {
  label: string;
  dias: number;
  variant: "default" | "secondary" | "destructive";
} {
  const hoje = new Date();
  const proxima = new Date(proximaData);
  const diffMs = proxima.getTime() - hoje.getTime();
  const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (dias < 0) return { label: "Vencido", dias, variant: "destructive" };
  if (dias <= 30) return { label: "Atenção", dias, variant: "secondary" };
  return { label: "Ok", dias, variant: "default" };
}

export default function ManutencoesPage() {
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [open, setOpen] = useState(false);
  const [clienteNome, setClienteNome] = useState("");
  const [aparelho, setAparelho] = useState("");
  const [tipoServico, setTipoServico] = useState("");
  const [dataRealizada, setDataRealizada] = useState("");
  const [proximaData, setProximaData] = useState("");
  const [observacoes, setObservacoes] = useState("");

  function handleSalvar() {
    if (!clienteNome || !aparelho || !dataRealizada || !proximaData) return;

    const nova: Manutencao = {
      id: Date.now(),
      clienteNome,
      aparelho,
      tipoServico,
      dataRealizada,
      proximaData,
      observacoes,
    };

    setManutencoes([...manutencoes, nova]);
    setClienteNome("");
    setAparelho("");
    setTipoServico("");
    setDataRealizada("");
    setProximaData("");
    setObservacoes("");
    setOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manutenções</h1>
          <p className="text-gray-500 mt-1">Registre e acompanhe as manutenções.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
  <Button className="flex items-center gap-2" onClick={() => setOpen(true)}>
    <Plus size={16} />
    Nova Manutenção
  </Button>
    
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Manutenção</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <Label>Cliente *</Label>
                <Input placeholder="Nome do cliente" value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Aparelho *</Label>
                <Input placeholder="Ex: Samsung 12000 BTU - Sala" value={aparelho} onChange={(e) => setAparelho(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Tipo de Serviço</Label>
                <Input placeholder="Ex: Limpeza, Recarga de gás" value={tipoServico} onChange={(e) => setTipoServico(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Data Realizada *</Label>
                <Input type="date" value={dataRealizada} onChange={(e) => setDataRealizada(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Próxima Manutenção *</Label>
                <Input type="date" value={proximaData} onChange={(e) => setProximaData(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Observações</Label>
                <Input placeholder="Anotações sobre o serviço" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
              </div>
              <Button onClick={handleSalvar} className="w-full">Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {manutencoes.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Nenhuma manutenção registrada ainda.</p>
          <p className="text-sm mt-1">Clique em "Nova Manutenção" para começar.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {manutencoes.map((m) => {
            const status = calcularStatus(m.proximaData);
            return (
              <Card key={m.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Wrench size={16} />
                      {m.clienteNome} — {m.aparelho}
                    </CardTitle>
                    <Badge variant={status.variant}>
                      {status.label} {status.dias >= 0 ? `(${status.dias} dias)` : `(${Math.abs(status.dias)} dias atrás)`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 flex flex-col gap-1">
                  {m.tipoServico && <p><span className="font-medium">Serviço:</span> {m.tipoServico}</p>}
                  <div className="flex items-center gap-4">
                    <p className="flex items-center gap-1">
                      <Calendar size={13} />
                      <span className="font-medium">Realizada:</span> {new Date(m.dataRealizada).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="flex items-center gap-1">
                      <Calendar size={13} />
                      <span className="font-medium">Próxima:</span> {new Date(m.proximaData).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  {m.observacoes && <p><span className="font-medium">Obs:</span> {m.observacoes}</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}