import { CreatePartInput, Part, UpdatePartInput } from '../domain/partsDomain';

export abstract class PartsService {
    abstract getAllParts(): Promise<Part[]>;
    abstract getPartById(id: number): Promise<Part>;
    abstract createPart(createPartInput: CreatePartInput): Promise<Part>;
    abstract updatePart(
        id: number,
        updatePartInput: UpdatePartInput
    ): Promise<Part>;
    abstract deletePart(id: number): Promise<void>;
}
