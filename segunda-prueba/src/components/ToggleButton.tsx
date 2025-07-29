import { useState } from "react";

const ToggleButton = () => {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <button onClick={() => setIsToggled(!isToggled)}>
            {isToggled ? "Activo ✅" : "Inactivo ⛔"}
        </button>
    );
};

export default ToggleButton;
