export interface toDoTask  {
    "id":number;
    "label": string;
    "description": string;
    "category": string;
    "done": boolean
}

export interface msg {
    content: string;
    isSuccess: boolean;
}