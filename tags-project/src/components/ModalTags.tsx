import { useEffect, useState } from "react";
import type { TagsModal } from "../types/tags";

interface ModalTagsProps {
    model?: TagsModal;
    onSave: (model: TagsModel) => void;
    onCancel: () => void;
    onReload?: () => void;
}

export default function ModalTags({ model, onSave, onCancel, onReload }: ModalTagsProps) {
    const [id, setId] = useState<number | undefined>(undefined);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#000000");
    const [type, setType] = useState<number | undefined>(undefined);
    const [isFrozen, setIsFrozen] = useState(false);

    const typeOptions = [
        { label: "Classification", value: 1 },
        { label: "DataSource", value: 2},
    ];

    useEffect(() => {
        if (model) {
            setId(model.id);
            setName(model.name ?? "");
            setDescription(model.description ?? "");
            setColor(model.color ?? "#000000");
            setType(model.type);
            setIsFrozen(model.is_frozen ?? false);
        } else{
            onNew();
        }
    }, [model]);
    
    const generateRandomColor = (): string => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    };

    const onNew = () => {
        setId(undefined);
        setName("");
        setDescription("");
        setColor(generateRandomColor());
        setType(undefined);
        setIsFrozen(false);
    };

    const handleSave = () => {
        if (isFrozen) {
            alert("This tag is frozen and cannot be edited.");
            return;
        }

        const newModel: TagsModel ={
            id,
            name,
            description,
            color,
            type,
            status: model?.status,
            is_frozen: isFrozen,
        };
                               
        onSave(newModel);
        if (onReload) onReload();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
                <h2 className="text-xl font-semibold mb-4">Tags</h2>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Name</label>
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded p-2"
                 />
                </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded p-2"
                />
            </div>

            <div className="mb-4 flex items-center gap-3">
                <label className="font-medium">Color</label>
                <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 border rounded"
                />
                <span>{color}</span>
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Type</label>
                <select
                value={type ?? ""}
                onChange={(e) => setType(Number(e.target.value))}
                className="w-full border rounded p-2"
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    {typeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                onClick={onCancel}
                className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
   );
  }