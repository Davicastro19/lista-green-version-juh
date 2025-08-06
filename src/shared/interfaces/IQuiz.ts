// types/quiz.ts
export interface Quiz {
    _id: string;
    email: string;
    responses: string[];
    score: number;
    total: number;
    createdAt: string;
    updatedAt: string;
}
