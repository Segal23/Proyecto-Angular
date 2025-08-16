export interface Student{
    name: string;
    surname: string;
    age: number;
    dni: number;
    average: number;
    id: number
}

export interface Course{
    name: string;
    code: string;
    credits: number;
    description: string;
    id: number;
}

export interface Inscription{
    studentDNI: number;
    courseCode: string;
    grade: number;
    status: string;
    enrollmentDate: string;
    id: number;
}

export interface User{
    id: number;
    name: string;
    surname: string;
    email: string;
    dni: number;
    username: string;
    password: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}