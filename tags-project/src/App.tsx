import { useState } from "react";

interface TagsModel {
  id?: number;
  name?: string;
  description?: string;
  color?: string;
  type?: number;
  status?: number;
}

export default function App() {
  const [formData, setFormData] = useState<TagsModel>({
    id: 0,
    name: "",
    description: "",
    color: "#000000", 
    type: 0,
    status: 0,
  });

  const [tags, setTags] = useState<TagsModel[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTag = { ...formData, id: Date.now() };

    setTags([...tags, newTag]);

    setFormData({
      id: 0,
      name: "",
      description: "",
      color: "#000000",
      type: 0,
      status: 0,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-6">
  <h2 className="text-xl font-bold mb-3">Nova Tag</h2>

  <div className="flex flex-col space-y-2">
    <label htmlFor="name" className="font-semibold">
      Nome
    </label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Nome da tag"
      value={formData.name}
      onChange={handleChange}
      className="max-w-md border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col space-y-2">
    <label htmlFor="description" className="font-semibold">
      Descrição
    </label>
    <input
      type="text"
      id="description"
      name="description"
      placeholder="Descrição"
      value={formData.description}
      onChange={handleChange}
      className="max-w-md border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col space-y-2">
    <label htmlFor="color" className="font-semibold">
      Cor
    </label>
    <input
      type="color"
      id="color"
      name="color"
      value={formData.color}
      onChange={handleChange}
      className="w-16 h-10 border border-gray-300 rounded"
    />
  </div>

  <div className="flex flex-col space-y-2">
    <label htmlFor="type" className="font-semibold">
      Tipo
    </label>
    <select
      id="type"
      name="type"
      value={formData.type}
      onChange={handleChange}
      className="border border-gray-300 rounded-md px-3 py-2"
    >
      <option value={0}>Selecione o tipo</option>
      <option value={1}>Tipo 1</option>
      <option value={2}>Tipo 2</option>
    </select>
  </div>

  <div className="flex flex-col space-y-2">
    <label htmlFor="status" className="font-semibold">
      Status
    </label>
    <select
      id="status"
      name="status"
      value={formData.status}
      onChange={handleChange}
      className="border border-gray-300 rounded-md px-3 py-2"
    >
      <option value={0}>Inativo</option>
      <option value={1}>Ativo</option>
    </select>
  </div>

  
  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
  >
    Salvar
  </button>
</form>

      <h2>Lista de Tags</h2>
      <div className="max-w-md mx-auto mt-6 space-y-3">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
            >
              <div>
                <h3 className="font-semibold">{tag.name}</h3>
                <p className="text-sm text-gray-600">{tag.description}</p>
                <span className="text-xs" style={{ color: tag.color }}>
                  {tag.color}
                </span>
              </div>
              <div className="text-sm text-gray-500 flex flex-col items-end">
                <span>Tipo: {tag.type}</span>
                <span>Status: {tag.status === 1 ? "Ativo" : "Inativo"}</span>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
