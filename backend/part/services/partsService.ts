import { NodePart } from '../domain/NodePart';

export abstract class PartsService {
    abstract getAllParts(
        pageNumber: number,
        pageSize: number
    ): Promise<NodePart[]>;
    // abstract getPartById(id: string): Promise<PartDomainModel>;
    // abstract createPart(
    //     createPartInput: CreatePartInput
    // ): Promise<PartDomainModel>;
    // abstract updatePart(
    //     id: string,
    //     updatePartInput: UpdatePartInput
    // ): Promise<PartDomainModel>;
    // abstract deletePart(id: string): Promise<void>;
}
