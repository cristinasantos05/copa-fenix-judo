import { Trophy, X } from "lucide-react";
import { useState } from "react";

type CreateCupModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate?: (data: {
    name: string;
    startDate: string;
    endDate: string;
  }) => void;
};

export default function CreateCupModal({
  open,
  onClose,
  onCreate,
}: CreateCupModalProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  if (!open) return null;

  function handleCreate() {
    onCreate?.({ name, startDate: date, endDate: date });
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 w-full max-w-md relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Criar Nova Copa</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-neutral-400 mb-2">
            Nome da Copa
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Copa Fênix 2025"
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-neutral-400 mb-2">Data</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors scheme-dark"
          />
        </div>

        <button
          onClick={handleCreate}
          className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg py-3 flex items-center justify-center gap-2 transition-colors"
        >
          <Trophy size={18} />
          Criar Copa
        </button>
      </div>
    </div>
  );
}
