export async function searchUser({ value }: { value: string }) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${process.env.URP_API}users/search?query=${value}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {}
}
