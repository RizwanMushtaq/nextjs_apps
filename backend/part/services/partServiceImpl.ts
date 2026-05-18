import { PartsService } from './partsService';
import { PrismaPartsRepository } from '../repositories/prismaPartsRepository';
import { NodePart } from '../domain/NodePart';

export class PartsServiceImpl implements PartsService {
    private partsRepository: PrismaPartsRepository;

    constructor(partsRepository: PrismaPartsRepository) {
        this.partsRepository = partsRepository;
    }

    async getAllParts(
        pageNumber: number,
        pageSize: number
    ): Promise<NodePart[]> {
        return this.partsRepository.getAllParts(pageNumber, pageSize);
    }

    // async getPartById(id: string): Promise<PartDomainModel> {
    //     return await this.partsRepository.getPartById(id);
    // }

    // async createPart(
    //     createPartInput: CreatePartInput
    // ): Promise<PartDomainModel> {
    //     return this.partsRepository.createPart(createPartInput);
    // }

    // async updatePart(
    //     id: string,
    //     updatePartInput: UpdatePartInput
    // ): Promise<PartDomainModel> {
    //     return this.partsRepository.updatePart(id, updatePartInput);
    // }

    // async deletePart(id: string): Promise<void> {
    //     return this.partsRepository.deletePart(id);
    // }
}
