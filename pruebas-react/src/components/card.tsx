type CardProps = {
    title: string;
    description: string;
    image: string;
};

const Card = ({ title, description, image }: CardProps) => {
    return (
        <section>
            <h2>{title}</h2>
            <p>{description}</p>
            <img src={image} alt="" />
        </section>
    )
}

export default Card;