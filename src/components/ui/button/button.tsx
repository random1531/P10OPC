
export default function Button({ onclick, textBtn, disabled = false }: { onclick?: () => void, textBtn: string, disabled: boolean }) {


    return (
        <button
            type="submit"
            disabled={disabled}
            onClick={onclick}
            className={` text-white rounded-xl w-2xs h-12 disabled:opacity-50 ${disabled ? ('bg-gray-400') : (`bg-black`)}`}
        >
            {textBtn}
        </button>
    )
}