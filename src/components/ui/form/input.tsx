export default function InputFunction({
  idvalue,
  type,
  onchange,
  labelText,
  valueInput,
}: {
  idvalue: string;
  valueInput?: string;
  labelText: string;
  type: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-black" htmlFor={idvalue}>
        {labelText}
      </label>
      <input
        type={type}
        id={idvalue}
        onChange={onchange || (() => {})}
        value={valueInput || ""}
        className="text-black border border-gray-200 p-4 w-full rounded-lg bg-white placeholder-gray-400 shadow-sm"
      />
    </div>
  );
}
