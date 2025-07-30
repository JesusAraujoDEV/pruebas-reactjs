import React from 'react';
// Importa tu archivo SCSS como un módulo CSS
import styles from './Card.module.scss';

interface CardProps {
  username: string;
  email: string;
  profilePictureUrl: string | null;
  bio: string | null;
}

const Card: React.FC<CardProps> = ({ username, email, profilePictureUrl, bio }) => {
  return (
    // Usa la clase SCSS importada
    <div className={styles['card-container']}> {/* Nota la sintaxis con corchetes si el nombre de la clase tiene guiones */}
      {/* Imagen de perfil */}
      {profilePictureUrl ? (
        <img
          src={profilePictureUrl}
          alt={`Profile picture of ${username}`}
          className={styles['profile-picture']}
        />
      ) : (
        <div className={styles['profile-placeholder']}>
          {username.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Nombre y email */}
      <h2>{username}</h2>
      <p>{email}</p>

      {/* Biografía */}
      {bio && <p className={styles.bio}>"{bio}"</p>} {/* Si tienes una clase específica para bio */}

      {/* Separador */}
      <div className={styles['footer-divider']}>
        Miembro de la comunidad MediArt
      </div>
    </div>
  );
};

export default Card;