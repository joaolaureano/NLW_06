import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type QuestionType = {
    id: string
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean;
    isHighlighted: boolean;
}
type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    }
    content: string,
    isAnswered: boolean;
    isHighlighted: boolean;
}>

export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const firebaseQuestions: FirebaseQuestions = room.val().questions;
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            });
            setQuestions(parsedQuestions);
            setTitle(room.val().title);
        });
    }, [roomId]);


    return { questions, title }
}