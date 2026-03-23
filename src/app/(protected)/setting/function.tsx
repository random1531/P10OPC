export async function UpdateUser({ name, email }: { name: string, email: string }) {
    const token = localStorage.getItem("token")
    const formData = { name, email }
    
    console.log({name,email})
    try {
        const response = await fetch("http://localhost:8000/auth/profile", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                 "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}