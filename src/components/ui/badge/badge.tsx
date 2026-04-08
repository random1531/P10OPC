export default function Badge({ status }: { status: string }) {
  const Badge = [
    {
      status: "IN_PROGRESS",
      color: "orange",
      textremplacement: "En cours",
      bgColor: "#FFF0D7",
    },
    {
      status: "DONE",
      color: "green",
      textremplacement: "Terminé",
      bgColor: "#F1FFF7",
    },
    {
      status: "TODO",
      color: "red",
      textremplacement: "À faire",
      bgColor: "#FFE0E0",
    },
  ];
  const badge = Badge.find((b) => b.status === status);
  return (
    <span
      className="cardStyle"
      style={{
        color: badge?.color,
        backgroundColor: badge?.bgColor,
        padding: "4px 8px",
        fontSize: "12px",
        fontWeight: "bold",
        height: "fit-content",
        borderRadius: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {badge ? badge.textremplacement : status}
    </span>
  );
}
