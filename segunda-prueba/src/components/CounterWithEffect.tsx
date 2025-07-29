import { useEffect } from "react"
import { useState } from "react";

const CounterWithEffect = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`El contador ha cambiado a: ${count}`);
    }, [count])

    return (
        <>
            <p>El contador está en: {count}</p>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
            <button onClick={() => setCount(count - 1)}>Decrementar</button>
        </>
    )
}

export default CounterWithEffect