import { useEffect, useState } from "react";
import Card from "../Card/Card"; // Asegúrate de que la ruta sea correcta. Si `Card` está en el mismo directorio, la ruta es solo './Card'
import styles from './UserList.module.scss';

// 1. Define una interfaz para el tipo de datos de un usuario que COINCIDA con tu API.
interface User {
  id: number;
  username: string;
  email: string;
  profilePictureUrl: string | null; // Puede ser string o null
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); // Estado para la carga
  const [error, setError] = useState<string | null>(null); // Estado para errores

  useEffect(() => {
    console.log("Iniciando solicitud de usuarios...");
    setLoading(true);
    setError(null);

    fetch("https://mediart-back.onrender.com/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: User[]) => {
        console.log("Datos recibidos de la API:", data);
        setUsers(data);
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err);
        setError(err.message || "Error desconocido al obtener datos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Cargando usuarios...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <>
    <div className={styles['container-list-card']}>
      <h1>Lista de usuarios:</h1>
        {users.length === 0 ? (
          <p>No hay usuarios disponibles.</p>
        ) : (
          <div> {/* Usa un div en lugar de ul para una mejor flexibilidad de layout con flexbox */}
            {users.map((user) => (
              <Card
                key={user.id} // La prop 'key' va en el componente que se renderiza en el map, no en un elemento HTML
                username={user.username}
                email={user.email}
                profilePictureUrl={user.profilePictureUrl}
                bio={user.bio} // Pasar el bio de la API
              />
            ))}
          </div>
        )}
    </div>
      
    </>
  );
};

export default UserList;