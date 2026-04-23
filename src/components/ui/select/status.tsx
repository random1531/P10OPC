import Badge from "../badge/badge";

type StatusProps = {
    value?: string; 
    onChange?: (status: string) => void;
    className?: string;
};

const STATUSES: { key: string; label: string }[] = [
    { key: "IN_PROGRESS", label: "En cours" },
    { key: "DONE", label: "Terminé" },
    { key: "TODO", label: "À faire" },
];

export default function Status({ value, onChange, className = "" }: StatusProps) {
    return (
        <div className={`flex gap-2 ${className}`}>
            {STATUSES.map((s) => {
                const selected = s.key === value;
                return (
                    <button
                        key={s.key}
                        type="button"
                        onClick={() => onChange?.(s.key)}
                        className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all border ${
                            selected ? "border-black bg-black/5" : "border-transparent hover:bg-gray-50"
                        }`}
                    >
                        <Badge status={s.key} />
                    </button>
                );
            })}
        </div>
    );
}