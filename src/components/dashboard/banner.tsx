import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// Definir tipos TypeScript
interface Profile {
    id: string;
    nickname: string;
    photoUrl?: string;
    Total_points: number;
    correct_answers: number;
}

interface UserData {
    profile: Profile;
}

export const Banner: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [profiles, setProfiles] = useState<Profile[]>([]);

    // Datos simulados para la maquetación
    const mockUser: UserData = {
        profile: {
            id: "1",
            nickname: "Usuario Demo",
            photoUrl: "/images/Logo-login.png",
            Total_points: 1250,
            correct_answers: 85
        }
    };

    const mockProfiles: Profile[] = [
        {
            id: "1",
            nickname: "Campeón",
            photoUrl: "",
            Total_points: 2500,
            correct_answers: 120
        },
        {
            id: "2",
            nickname: "Sabio",
            Total_points: 1800,
            correct_answers: 95
        },
        {
            id: "3",
            nickname: "Genio",
            Total_points: 1500,
            correct_answers: 80
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setUser(mockUser);
            const sortedProfiles = [...mockProfiles].sort((a, b) => b.Total_points - a.Total_points);
            setProfiles(sortedProfiles);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='div-banner-puntajes'>
            {/* BANNER */}
            <div className='div-banner'>
                <div className='parrafos-div'>
                    <h2>Bienvenido, {user && user.profile ? user.profile.nickname : 'Cargando...'}</h2>
                    <p>
                        Bienvenido a Concursemos, la plataforma de juego de preguntas donde el conocimiento 
                        y la diversión se unen. Compite con tus amigos, explora categorías como ciencia, 
                        historia y entretenimiento, y reta tu mente en cada partida.
                    </p>
                </div>
                <div className='imagen-banner-div'>
                    <img src="/images/Imagen-Banner.png" alt="" />
                </div>
            </div>

            {/* SECCIÓN DE PUNTAJES */}
            <div className='div-puntajes'>
                <div className='header-puntajes'>
                    <p>Máximos Puntajes</p>
                    <Link to="/usuarios">Ver todo el ranking</Link>
                </div>

                {/* RANKING */}
                <div className='div-ranking'>
                    {
                        profiles ? profiles.map((item) => (
                            <div className='div-user-ranking' key={item.id}>
                                <div className='user-ranking'>
                                    <img 
                                        src={item.photoUrl ? item.photoUrl : "/images/Logos/Logo-login.png"} 
                                        alt="" 
                                    />
                                    <p className="truncate">{item.nickname}</p>
                                </div>
                                <div className='div-puntos'>
                                    <p className='p-puntos'>{item.Total_points} Puntos</p>
                                    <p className='p-preguntas-correctas'>
                                        {item.correct_answers} preguntas correctas
                                    </p>
                                </div>
                            </div>
                        )).slice(0, 3)
                        : ''
                    }
                </div>
            </div>
        </div>
    );
}

export default Banner;