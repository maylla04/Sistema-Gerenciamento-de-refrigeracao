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
import { Plus, Phone, Mail, MapPin } from "lucide-react";

type Cliente = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  ativo: boolean;
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");

  function handleSalvar() {
    if (!nome || !telefone) return;

    const novoCliente: Cliente = {
      id: Date.now(),
      nome,
      telefone,
      email,
      endereco,
      ativo: true,
    };

    setClientes([...clientes, novoCliente]);
    setNome("");
    setTelefone("");
    setEmail("");
    setEndereco("");
    setOpen(false);
  }

  function handleDesativar(id: number) {
    setClientes(clientes.map((c) => c.id === id ? { ...c, ativo: !c.ativo } : c));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
          <p className="text-gray-500 mt-1">Gerencie seus clientes cadastrados.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          
            <Button className="flex items-center gap-2" onClick={() => setOpen(true)}>
              <Plus size={16} />
              Novo Cliente
            </Button>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Cliente</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <Label>Nome *</Label>
                <Input placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Telefone *</Label>
                <Input placeholder="(11) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>E-mail</Label>
                <Input placeholder="cliente@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Endereço</Label>
                <Input placeholder="Rua, número, bairro" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
              </div>
              <Button onClick={handleSalvar} className="w-full">Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {clientes.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Nenhum cliente cadastrado ainda.</p>
          <p className="text-sm mt-1">Clique em "Novo Cliente" para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {clientes.map((cliente) => (
            <Card key={cliente.id} className={!cliente.ativo ? "opacity-50" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{cliente.nome}</CardTitle>
                  <Badge variant={cliente.ativo ? "default" : "secondary"}>
                    {cliente.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{cliente.telefone}</span>
                </div>
                {cliente.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <span>{cliente.email}</span>
                  </div>
                )}
                {cliente.endereco && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{cliente.endereco}</span>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => handleDesativar(cliente.id)}
                >
                  {cliente.ativo ? "Desativar" : "Reativar"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}