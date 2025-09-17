import { useState } from "react";
import { TagsService } from "./services/tags.service";

interface Item {
  nome: string;
  descricao: string;
  cor: string;
  status: boolean;
}

export default function CadastroItens() {
  const [formData, setFormData] = useState<Item>({
    nome: "",
    descricao: "",
    cor: "#000000",
    status: true,
  });

  const [itens, setItens] = useState<Item[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //setItens((prev) => [...prev, formData]);

    const Tag = {
      name: formData.nome,
      description: formData.descricao,
      color: formData.cor,
      type: 1,
      status: formData.status ? 1 : 0,
      is_frozen: 0
    };

    await TagsService.insert(Tag, 1);

    setFormData({
      nome: "",
      descricao: "",
      cor: "#000000",
      status: true,
    });
  };

   const handleRefresh = async () => {
    const data = await TagsService.getAll();
   
    const teste: Item[] = data.tags.map((a): Item => ({
      nome: a.name,
      descricao: a.description,
      cor: a.color,
      status: a.status,
    }));

    setItens(teste);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Itens</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-6 rounded-lg shadow"
      >
        <div>
          <label className="block mb-1 font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="w-3/4 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Cor</label>
          <input
            type="color"
            name="cor"
            value={formData.cor}
            onChange={handleChange}
            className="w-16 h-10 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, status: true }))
              }
              className={`px-4 py-2 rounded ${
                formData.status ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              Ativo
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, status: false }))
              }
              className={`px-4 py-2 rounded ${
                !formData.status ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              Inativo
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Salvar
        </button>
      </form>

      <div className="mt-6">
        <button
        onClick={handleRefresh}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Atualizar Lista
        </button>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Lista de Itens</h2>
      <table className="w-full border-collapse border rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Nome</th>
            <th className="border px-4 py-2 text-left">Descrição</th>
            <th className="border px-4 py-2 text-left">Cor</th>
            <th className="border px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{item.nome}</td>
              <td className="border px-4 py-2">{item.descricao}</td>
              <td className="border px-4 py-2">
                <span
                  className="inline-block w-6 h-6 rounded"
                  style={{ backgroundColor: item.cor }}
                />
              </td>
              <td className="border px-4 py-2">
                {item.status ? "Ativo" : "Inativo"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
