import {
    CreatePartInput,
    PartDomainModel,
    UpdatePartInput,
} from '../domain/partsDomain';

export abstract class PartsService {
    abstract getAllParts(): Promise<PartDomainModel[]>;
    abstract getPartById(id: string): Promise<PartDomainModel>;
    abstract createPart(
        createPartInput: CreatePartInput
    ): Promise<PartDomainModel>;
    abstract updatePart(
        id: string,
        updatePartInput: UpdatePartInput
    ): Promise<PartDomainModel>;
    abstract deletePart(id: string): Promise<void>;
}
