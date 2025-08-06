'use client'
import { useParams } from "next/navigation";
import { Suspense } from "react";
import QuizzesPage from "./QuizzesPage";



export default function DadosPage() {
    const params = useParams();
    const slug = params?.slug as string;

    return (
        <Suspense fallback={<p className="text-center mt-10">Carregando quizzes...</p>}>
            <QuizzesPage slug={slug} />
        </Suspense>
    );
}
