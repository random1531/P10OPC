import { toast } from "sonner";
export async function searchuserFc({ searchUse }: { searchUse: string }) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8000/users/search?query=${searchUse}`, {

            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }

        })
        const res = await response.json()
        if (res.success) {

       
        }
        else{
         
        }
        return res

    } catch (error) {

    }

}