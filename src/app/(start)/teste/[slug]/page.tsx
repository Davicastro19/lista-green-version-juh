'use client'
import httpService from "@/shared/api/fetcher";
import authStore from "@/shared/stores/authStore";
import { motion } from "framer-motion";
import { observer } from "mobx-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const questions = [
    "Você leva sua garrafinha ou copo quando sai de casa para não utilizar copos descartáveis?",
    "Você evita utilizar copos, pratos, talheres ou canudos descartáveis?",
    "Você reutiliza embalagens e caixas para artesanato, presentes ou utilidades de casa?",
    "Você leva a sacola retornável quando vai fazer compras (ex: supermercado) para evitar receber sacolas plásticas?",
    "Você faz a separação do lixo orgânico (restos de comida, casca de frutas....) do lixo reciclável (papel, vidro, plástico....) na sua casa?",
    "Você fecha a torneira enquanto está escovando os dentes ou passando xampu e não está utilizando a água?",
    "Você utiliza água da chuva ou água de reuso para lavar calçada, carro ou regar plantas?",
    "Você evita fazer impressão desnecessária para economizar o uso de papel e tinta?",
    "Você apaga as lâmpadas dos ambientes que não estão sendo utilizados?",
    "Você desliga os aparelhos elétricos quando não estão sendo utilizados ou carregando?"
];

const options = [
    { label: "Sempre", value: "10" },
    { label: "Às vezes", value: "5" },
    { label: "Quase Nunca", value: "2" },
    { label: "Nunca", value: "0" }
];

const SustainabilityQuiz = () => {
    const params = useParams();
    const slug = params?.slug as string;


    const [step, setStep] = useState(0);
    const [responses, setResponses] = useState(Array(questions.length).fill("0"));
    const [email, setEmail] = useState("");

    const [isPular, setisPular] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const { user } = authStore
    const [load, setLoad] = useState(false);
    const router = useRouter();

    const handleNext = () => {
        if (step + 1 === 10) submitQuizData();
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleResponseChange = (value: string) => {
        const newResponses = [...responses];
        newResponses[step] = value;
        setResponses(newResponses);
    };

    const handleEmailSubmit = () => {
        if (email) {
            setIsAuthenticated(true);
        }
    };

    const handleEmailSubmitS = () => setisPular(true);

    const handleIntroSubmit = () => {
        setShowIntro(false);
        if (email) handleEmailSubmit();
    };

    const calculateScore = () =>
        responses.reduce((acc, curr) => acc + parseInt(curr), 0);


    const totalSteps = questions.length;
    const progress = (step / totalSteps) * 100;
    const score = calculateScore();
    const resultProgress = (score / (totalSteps * 10)) * 100;


    const submitQuizData = async () => {
        const quizData = {
            email,
            responses,
            score,
            slug,
            total: Number(resultProgress.toFixed(0))
        };

        try {
            await httpService.post("/quiz", quizData);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    };



    useEffect(() => {
        setLoad(true);
        if (user) {
            setEmail(user.email);
            handleEmailSubmitS()
        }
        setLoad(false);
    }, [user]);

    if (load) return null;

    return (
        <>
            <div className="fixed bottom-5 right-5 z-50">
                <a
                    href="https://api.whatsapp.com/send?phone=558588000440&text=Oi!%20Estou%20aqui%20porque%20participei%20da%20pesquisa%20e%20gostaria%20de%20saber%20mais."
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg text-lg hover:bg-green-700">
                        <FaWhatsapp className="text-2xl" />
                        Entre em contato
                    </button>
                </a>
            </div>

            <div className="max-w-xl mx-auto mt-12 p-6 border rounded-lg shadow">
                {!user && !isPular ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="mb-4">Por favor, faça login para começar o questionário ou continue como convidado:</p>
                        <div className="flex gap-4">
                            <button onClick={() => router.push("/login")} className="bg-teal-600 text-white px-4 py-2 rounded">
                                Fazer login
                            </button>
                            <button onClick={handleEmailSubmitS} className="bg-teal-600 text-white px-4 py-2 rounded">
                                Continuar como convidado
                            </button>
                        </div>
                    </motion.div>
                ) : showIntro ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="text-xl font-bold mb-4">QUANTO VOCÊ É SUSTENTÁVEL? (Fase 01)</h2>
                        <p className="mb-4">A equipe da Lista Green tem certeza de que você deseja ver o nosso planeta saudável... Escolha uma das opções para as perguntas a seguir e descubra o quanto você é sustentável.</p>
                        <button onClick={handleIntroSubmit} className="bg-teal-600 text-white px-4 py-2 rounded">
                            Iniciar Teste
                        </button>
                    </motion.div>
                ) : !isAuthenticated && !user ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="mb-4">Por favor, insira seu e-mail para começar o questionário:</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Seu e-mail"
                            className="border p-2 w-full mb-4 rounded"
                        />
                        <button onClick={handleEmailSubmit} className="bg-teal-600 text-white px-4 py-2 rounded">
                            Iniciar Questionário
                        </button>
                    </motion.div>
                ) : step < questions.length ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="mb-4">{questions[step]}</p>
                        <div className="flex flex-col gap-2">
                            {options.map((option) => (
                                <label key={option.value} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="response"
                                        value={option.value}
                                        checked={responses[step] === option.value}
                                        onChange={() => handleResponseChange(option.value)}
                                        className="accent-green-500"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded mt-4">
                            <div
                                className="h-full bg-green-400 rounded"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button onClick={handleBack} disabled={step === 0} className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50">
                                Voltar
                            </button>
                            <button onClick={handleNext} className="bg-green-500 text-white px-4 py-2 rounded">
                                Próximo
                            </button>
                            <button disabled className="bg-gray-100 px-4 py-2 rounded">{progress.toFixed(0)}%</button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="text-xl font-bold">Resultados</h2>
                        <div className="relative w-28 h-28 my-4">
                            <svg className="absolute top-0 left-0 w-full h-full">
                                <circle
                                    cx="56"
                                    cy="56"
                                    r="50"
                                    strokeWidth="12"
                                    stroke="#e5e7eb"
                                    fill="none"
                                />
                                <circle
                                    cx="56"
                                    cy="56"
                                    r="50"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    stroke="#3ece9e"
                                    strokeDasharray="314"
                                    strokeDashoffset={314 - (314 * resultProgress) / 100}
                                    fill="none"
                                />
                            </svg>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xl font-bold">
                                {resultProgress.toFixed(0)}%
                            </div>
                        </div>
                        <p className="mt-4">Sua pontuação: {score}%</p>
                        <p className="mt-4">
                            {
                                score <= 20 ? (
                                    "É muito importante que você assuma o compromisso com a preservação do meio ambiente."
                                ) : score > 20 && score <= 60 ? (
                                    "Você já está adotando algumas práticas sustentáveis, mas ainda pode melhorar."
                                ) : score > 60 && score <= 80 ? (
                                    "Parabéns! Você está adotando várias práticas sustentáveis, mas ainda pode avançar mais."
                                ) : (
                                    "Excelente! Parabéns! Você está entre os heróis Green."
                                )
                            }
                        </p>

                        <button onClick={() => setStep(0)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                            Refazer teste
                        </button>

                        {!user && (
                            <button
                                onClick={() => router.push("/cadastro")}
                                className="mt-4 w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                            >
                                Para você continuar melhorando, cadastre-se na Lista Green 💚
                            </button>
                        )}

                    </motion.div>
                )}
            </div>
        </>
    );
};

export default observer(SustainabilityQuiz);
