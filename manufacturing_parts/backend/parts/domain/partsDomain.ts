export type Part = {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
};

export type CreatePartInput = {
    name: string;
    description?: string;
};

export type UpdatePartInput = Partial<CreatePartInput>;
