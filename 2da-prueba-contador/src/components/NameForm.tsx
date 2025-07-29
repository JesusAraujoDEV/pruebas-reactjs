import { useState } from "react"

const NameForm = () => {
    const [name, setName] = useState("");

    return (
        <>
            <input 
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)} /> 
            <p>Tu nombre es: {name || "visitante"}</p>
        </>
    )
}

export default NameForm