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
import { Plus, AirVent } from "lucide-react";

type Aparelho = {
  id: number;
  clienteNome: string;
  marca: string;
  modelo: string;
  btu: string;
  ativo: boolean;
};

export default function AparelhosPage() {
  const [aparelhos, setAparelhos] = useState<Aparelho[]>([]);
  const [open, setOpen] = useState(false);
  const [clienteNome, setClienteNome] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [btu, setBtu] = useState("");

  function handleSalvar() {
    if (!clienteNome || !marca || !modelo) return;

    const novoAparelho: Aparelho = {
      id: Date.now(),
      clienteNome,
      marca,
      modelo,
      btu,
      ativo: true,
    };

    setAparelhos([...aparelhos, novoAparelho]);
    setClienteNome("");
    setMarca("");
    setModelo("");
    setBtu("");
    setOpen(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Aparelhos</h1>
          <p className="text-gray-500 mt-1">Gerencie os aparelhos cadastrados.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Novo Aparelho
            </Button>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Aparelho</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <Label>Cliente *</Label>
                <Input placeholder="Nome do cliente" value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Marca *</Label>
                <Input placeholder="Ex: Samsung, LG, Midea" value={marca} onChange={(e) => setMarca(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Modelo *</Label>
                <Input placeholder="Ex: Wind Free 12000" value={modelo} onChange={(e) => setModelo(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Capacidade (BTU)</Label>
                <Input placeholder="Ex: 12000" value={btu} onChange={(e) => setBtu(e.target.value)} />
              </div>
              <Button onClick={handleSalvar} className="w-full">Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {aparelhos.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Nenhum aparelho cadastrado ainda.</p>
          <p className="text-sm mt-1">Clique em "Novo Aparelho" para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {aparelhos.map((aparelho) => (
            <Card key={aparelho.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AirVent size={16} />
                    {aparelho.marca} {aparelho.modelo}
                  </CardTitle>
                  <Badge variant={aparelho.ativo ? "default" : "secondary"}>
                    {aparelho.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 flex flex-col gap-1">
                <p><span className="font-medium">Cliente:</span> {aparelho.clienteNome}</p>
                {aparelho.btu && (
                  <p><span className="font-medium">BTU:</span> {aparelho.btu}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}