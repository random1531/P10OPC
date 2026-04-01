// connexion function

export async function LoginFunction({ email, password }: { email: string, password: string }) {
  const formData = { email, password };
  try {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {

     
    };
    localStorage.setItem("token", data.data.token);
  
   
    return data;
  } catch (error) {
    console.log("Erreur lors de la connexion:", error);
  }
}

// register Function

export async function RegisterFunction({email,password,name}:{email:string,password:string,name:string}){
  const formData = { email,password,name};
  try {
    const res = await fetch("http://localhost:8000/auth/register",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
  
    return data 
  } catch (error) {

  }
}