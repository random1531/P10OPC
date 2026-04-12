export default function Button({
  onclick,
  textBtn,
  disabled = false,
}: {
  onclick?: () => void;
  textBtn: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onclick}
      className={` text-white cursor-pointer z-0 rounded-xl md:w-2xs w-auto md:h-12 h-auto disabled:opacity-50 ${disabled ? "bg-gray-400" : `bg-black`}`}
    >
      {textBtn}
    </button>
  );
}
