import { PrismaClient } from '@/generated/prisma/client';
import {
    CreatePartInput,
    PartDomainModel,
    UpdatePartInput,
} from '../domain/partsDomain';

export class PrismaPartsRepository {
    private prismaClient: PrismaClient;

    constructor(prismaSqliteClient: PrismaClient) {
        this.prismaClient = prismaSqliteClient;
    }

    async getAllParts(): Promise<PartDomainModel[]> {
        const parts = await this.prismaClient.part.findMany();
        return parts.map((part) => ({
            id: part.id,
            part_code: part.part_code,
            name: part.name,
            description: part.description ?? undefined,
            createdAt: part.createdAt.toISOString(),
            updatedAt: part.updatedAt.toISOString(),
        }));
    }

    async getPartById(id: string): Promise<PartDomainModel> {
        const part = await this.prismaClient.part.findUniqueOrThrow({
            where: { id },
        });
        return {
            id: part.id,
            part_code: part.part_code,
            name: part.name,
            description: part.description ?? undefined,
            createdAt: part.createdAt.toISOString(),
            updatedAt: part.updatedAt.toISOString(),
        };
    }

    async createPart(
        createPartInput: CreatePartInput
    ): Promise<PartDomainModel> {
        const part = await this.prismaClient.part.create({
            data: createPartInput,
        });
        return {
            id: part.id,
            part_code: part.part_code,
            name: part.name,
            description: part.description ?? undefined,
            createdAt: part.createdAt.toISOString(),
            updatedAt: part.updatedAt.toISOString(),
        };
    }

    async updatePart(
        id: string,
        updatePartInput: UpdatePartInput
    ): Promise<PartDomainModel> {
        const part = await this.prismaClient.part.update({
            where: { id },
            data: updatePartInput,
        });
        return {
            id: part.id,
            part_code: part.part_code,
            name: part.name,
            description: part.description ?? undefined,
            createdAt: part.createdAt.toISOString(),
            updatedAt: part.updatedAt.toISOString(),
        };
    }

    async deletePart(id: string): Promise<void> {
        await this.prismaClient.part.delete({
            where: { id },
        });
        return;
    }
}
