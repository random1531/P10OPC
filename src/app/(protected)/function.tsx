
export async function GetDetailsTaskProject({ id }: { id: string }) {
    const token = localStorage.getItem("token");
    try {
        const reponse = await fetch(`http://localhost:8000/projects/${id}/tasks`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,

            }
        })
        const result = await reponse.json()
        return result
        if (!reponse) {
            throw new Error(result.message)
        }
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
}