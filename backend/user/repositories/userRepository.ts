import { PrismaClient } from '@/generated/prisma/client';
import {
    CreateUserInput,
    UpdateUserInput,
    UserDomainModel,
} from '../domain/userDomain';

export class UserRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async getAllUsers(): Promise<UserDomainModel[]> {
        const users = await this.prismaClient.user.findMany();
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        }));
    }

    async getUserById(id: string): Promise<UserDomainModel> {
        const user = await this.prismaClient.user.findUniqueOrThrow({
            where: { id },
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        };
    }

    async createUser(
        createUserInput: CreateUserInput
    ): Promise<UserDomainModel> {
        const { name, email, password } = createUserInput;
        const createdUser = await this.prismaClient.user.create({
            data: { name, email, password },
        });
        return {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            createdAt: createdUser.createdAt.toISOString(),
            updatedAt: createdUser.updatedAt.toISOString(),
        };
    }

    async updateUser(
        id: string,
        updateUserInput: UpdateUserInput
    ): Promise<UserDomainModel> {
        const updatedUser = await this.prismaClient.user.update({
            where: { id },
            data: updateUserInput,
        });
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            createdAt: updatedUser.createdAt.toISOString(),
            updatedAt: updatedUser.updatedAt.toISOString(),
        };
    }

    async deleteUser(id: string): Promise<void> {
        await this.prismaClient.user.delete({
            where: { id },
        });
    }
}
