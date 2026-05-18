import { PrismaClient } from '@/generated/prisma/client';
import { NodePart } from '../domain/NodePart';
export class PrismaPartsRepository {
    private prismaClient: PrismaClient;

    constructor(prismaSqliteClient: PrismaClient) {
        this.prismaClient = prismaSqliteClient;
    }

    async getAllParts(
        pageNumber: number = 1,
        pageSize: number = 100
    ): Promise<NodePart[]> {
        const skip = (pageNumber - 1) * pageSize;
        const parts = await this.prismaClient.part.findMany({
            skip,
            take: pageSize,
            orderBy: { id: 'asc' },
        });
        const nodeParts = parts.map(
            (part) =>
                new NodePart(
                    part.id,
                    part.parentId,
                    part.description,
                    part.quantityPerParent,
                    part.materialCost,
                    part.manufacturingCost,
                    part.directCost,
                    part.subTreeCost
                )
        );
        //TODO: Optimize this as currently it will not include all the children of a node
        nodeParts.forEach((nodePart) => {
            const parentId = nodePart.getParentId();
            if (parentId) {
                const parentNode = nodeParts.find(
                    (np) => np.getId() === parentId
                );
                if (parentNode) {
                    parentNode.addChild(nodePart);
                }
            }
        });

        return nodeParts;
    }

    // async getPartById(id: string): Promise<PartDomainModel> {
    //     const part = await this.prismaClient.part.findUniqueOrThrow({
    //         where: { id },
    //     });
    //     return {
    //         id: part.id,
    //         part_code: part.part_code,
    //         name: part.name,
    //         description: part.description ?? undefined,
    //         createdAt: part.createdAt.toISOString(),
    //         updatedAt: part.updatedAt.toISOString(),
    //     };
    // }

    // async createPart(
    //     createPartInput: CreatePartInput
    // ): Promise<PartDomainModel> {
    //     const part = await this.prismaClient.part.create({
    //         data: createPartInput,
    //     });
    //     return {
    //         id: part.id,
    //         part_code: part.part_code,
    //         name: part.name,
    //         description: part.description ?? undefined,
    //         createdAt: part.createdAt.toISOString(),
    //         updatedAt: part.updatedAt.toISOString(),
    //     };
    // }

    // async updatePart(
    //     id: string,
    //     updatePartInput: UpdatePartInput
    // ): Promise<PartDomainModel> {
    //     const part = await this.prismaClient.part.update({
    //         where: { id },
    //         data: updatePartInput,
    //     });
    //     return {
    //         id: part.id,
    //         part_code: part.part_code,
    //         name: part.name,
    //         description: part.description ?? undefined,
    //         createdAt: part.createdAt.toISOString(),
    //         updatedAt: part.updatedAt.toISOString(),
    //     };
    // }

    // async deletePart(id: string): Promise<void> {
    //     await this.prismaClient.part.delete({
    //         where: { id },
    //     });
    //     return;
    // }
}
