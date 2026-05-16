import { CreatePartInput, Part, UpdatePartInput } from '../domain/partsDomain';
import { PartsService } from './partsService';
import { PrismaPartsRepository } from '../repositories/prismaPartsRepository';
import { NotFoundError } from '@/backend/exceptions/apiError';

export class PartsServiceImpl implements PartsService {
    private partsRepository: PrismaPartsRepository;

    constructor(partsRepository: PrismaPartsRepository) {
        this.partsRepository = partsRepository;
    }

    async getAllParts(): Promise<Part[]> {
        return this.partsRepository.getAllParts();
    }

    async getPartById(id: number): Promise<Part> {
        const part = await this.partsRepository.getPartById(id);
        if (!part) {
            throw new NotFoundError(`Part with id ${id} not found`);
        }
        return part;
    }

    async createPart(createPartInput: CreatePartInput): Promise<Part> {
        return this.partsRepository.createPart(createPartInput);
    }

    async updatePart(
        id: number,
        updatePartInput: UpdatePartInput
    ): Promise<Part> {
        const part = await this.partsRepository.getPartById(id);
        if (!part) {
            throw new NotFoundError(`Part with id ${id} not found`);
        }
        return this.partsRepository.updatePart(id, updatePartInput);
    }

    async deletePart(id: number): Promise<void> {
        const part = await this.partsRepository.getPartById(id);
        if (!part) {
            throw new NotFoundError(`Part with id ${id} not found`);
        }
        return this.partsRepository.deletePart(id);
    }
}
