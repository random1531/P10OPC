export default function ProjetcCard({
  Name,
  Description,
}: {
  Name: string;
  Description: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full text-start">
      <h5 className="font-semibold text-[18px] text-[#1F1F1F]">{Name}</h5>
      <p className="font-normal text-sm text-gray-600">{Description}</p>
    </div>
  );
}
