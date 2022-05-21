import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import illustrarionImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import { database } from '../services/firebase';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';


export function NewRoom() {


    const [newRoom, setNewRoom] = useState('');

    const { user } = useAuth();

    const history = useHistory();


    async function handleCreateNewRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') return;


        const roomRef = database.ref('rooms');

        const firebaseRooms = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/rooms/${firebaseRooms.key}`);
    }

    return (
        <div id="page-auth">

            <aside>
                <img src={illustrarionImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>
                    Crie salas de Q&amp;A ao-vivo
    </strong>
                <p>
                    Tira as dúvidas da sua audiência em tempo-real
    </p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateNewRoom} >
                        <input type="text"
                            placeholder="Digite o nome da sala"
                            onChange={event => { setNewRoom(event.target.value) }}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )

}