'use client';

import useFetch from "@/shared/api/swrfetcher";
import { Quiz } from "@/shared/interfaces/IQuiz";
import { format } from 'date-fns';

type Props = {
    slug: string;
};

export default function QuizzesPage({ slug }: Props) {
    const {
        data: quizzes = [],
        error,
        isLoading,
    } = useFetch<Quiz[]>(`/quiz/${slug}`);
    console.log(quizzes, error, isLoading);
    if (isLoading) return <p className="text-center mt-10">Carregando quizzes...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">Erro ao carregar quizzes.</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Todos os Questionários</h1>

            {quizzes?.length === 0 ? (
                <p className="text-gray-600">Nenhum questionário encontrado.</p>
            ) : (
                <ul className="space-y-4">
                    {quizzes.map((quiz) => (
                        <li
                            key={quiz._id}
                            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Email:</span> {quiz.email}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Pontuação:</span> {(quiz.score / 100) * 100}%
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Respostas:</span> {quiz.responses.join(', ')}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-400 mt-2 sm:mt-0">
                                    {format(new Date(quiz.createdAt), 'dd/MM/yyyy HH:mm')}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
