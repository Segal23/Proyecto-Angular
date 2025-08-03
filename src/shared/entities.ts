export interface Student{
    name: string;
    surname: string;
    age: number;
    dni: number;
    average: number;
}

export interface Course{
    name: string;
    code: string;
    credits: number;
    description: string;
}

export interface Inscription{
    studentDNI: number;
    courseCode: string;
    grade: number;
    status: string;
    enrollmentDate: string;
}