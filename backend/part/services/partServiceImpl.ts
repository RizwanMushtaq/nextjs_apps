import {
    CreatePartInput,
    PartDomainModel,
    UpdatePartInput,
} from '../domain/partsDomain';
import { PartsService } from './partsService';
import { PrismaPartsRepository } from '../repositories/prismaPartsRepository';

export class PartsServiceImpl implements PartsService {
    private partsRepository: PrismaPartsRepository;

    constructor(partsRepository: PrismaPartsRepository) {
        this.partsRepository = partsRepository;
    }

    async getAllParts(): Promise<PartDomainModel[]> {
        return this.partsRepository.getAllParts();
    }

    async getPartById(id: string): Promise<PartDomainModel> {
        return await this.partsRepository.getPartById(id);
    }

    async createPart(
        createPartInput: CreatePartInput
    ): Promise<PartDomainModel> {
        return this.partsRepository.createPart(createPartInput);
    }

    async updatePart(
        id: string,
        updatePartInput: UpdatePartInput
    ): Promise<PartDomainModel> {
        return this.partsRepository.updatePart(id, updatePartInput);
    }

    async deletePart(id: string): Promise<void> {
        return this.partsRepository.deletePart(id);
    }
}
