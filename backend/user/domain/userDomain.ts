export type UserDomainModel = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
};

export type UpdateUserInput = Partial<CreateUserInput>;
