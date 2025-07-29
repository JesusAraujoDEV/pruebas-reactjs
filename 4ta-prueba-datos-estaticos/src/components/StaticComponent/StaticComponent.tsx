const StaticComponent = () => {
    const items = ["Luffy", "Sanji", "Zoro", "Nami", "Usopp"];

    return (
        <>
            <ul>
                {
                    items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
        </>
    )
}

export default StaticComponent;