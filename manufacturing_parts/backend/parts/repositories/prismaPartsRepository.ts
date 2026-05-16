import { PrismaClient } from '@/generated/prisma/client';
import { CreatePartInput, Part, UpdatePartInput } from '../domain/partsDomain';

export class PrismaPartsRepository {
    private prismaClient: PrismaClient;

    constructor(prismaSqliteClient: PrismaClient) {
        this.prismaClient = prismaSqliteClient;
    }

    async getAllParts(): Promise<Part[]> {
        const parts = await this.prismaClient.part.findMany();
        return parts.map((part) => ({
            id: part.id,
            name: part.name,
            description: part.description ?? undefined,
            createdAt: part.createdAt.toISOString(),
            updatedAt: part.updatedAt.toISOString(),
        }));
    }

    async getPartById(id: number): Promise<Part | null> {
        const part = await this.prismaClient.part.findUnique({
            where: { id },
        });
        if (!part) {
            return null;
        }
        return {
            id: part.id,
            name: part.name,
            description: part.description ?? undefined,
            createdAt: part.createdAt.toISOString(),
            updatedAt: part.updatedAt.toISOString(),
        };
    }

    async createPart(createPartInput: CreatePartInput): Promise<Part> {
        const part = await this.prismaClient.part.create({
            data: createPartInput,
        });
        return {
            id: part.id,
            name: part.name,
            description: part.description ?? undefined,
            createdAt: part.createdAt.toISOString(),
            updatedAt: part.updatedAt.toISOString(),
        };
    }

    async updatePart(
        id: number,
        updatePartInput: UpdatePartInput
    ): Promise<Part> {
        const part = await this.prismaClient.part.update({
            where: { id },
            data: updatePartInput,
        });
        return {
            id: part.id,
            name: part.name,
            description: part.description ?? undefined,
            createdAt: part.createdAt.toISOString(),
            updatedAt: part.updatedAt.toISOString(),
        };
    }

    async deletePart(id: number): Promise<void> {
        await this.prismaClient.part.delete({
            where: { id },
        });
        return;
    }
}
