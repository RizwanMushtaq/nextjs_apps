export class NodePart {
    private readonly id: string;
    private readonly parentId: string | null;
    private readonly description: string;
    private readonly quantityPerParent: number;
    private readonly materialCost: number;
    private readonly manufacturingCost: number;
    private readonly directCost: number;
    private subTreeCost: number;
    private readonly children: NodePart[];

    constructor(
        id: string,
        parentId: string | null,
        description: string,
        quantityPerParent: number,
        materialCost: number,
        manufacturingCost: number,
        directCost: number,
        subTreeCost: number
    ) {
        this.id = id;
        this.parentId = parentId;
        this.description = description;
        this.quantityPerParent = quantityPerParent;
        this.materialCost = materialCost;
        this.manufacturingCost = manufacturingCost;
        this.directCost = directCost;
        this.subTreeCost = subTreeCost;
        this.children = [];
    }

    getId(): string {
        return this.id;
    }

    getParentId(): string | null {
        return this.parentId;
    }

    getDescription(): string {
        return this.description;
    }

    getQuantityPerParent(): number {
        return this.quantityPerParent;
    }

    getMaterialCost(): number {
        return this.materialCost;
    }

    getManufacturingCost(): number {
        return this.manufacturingCost;
    }
    getDirectCost(): number {
        return this.directCost;
    }
    getSubTreeCost(): number {
        return this.subTreeCost;
    }

    getChildren(): NodePart[] {
        return this.children;
    }

    addChild(child: NodePart): void {
        this.children.push(child);
    }

    setSubTreeCost(cost: number): void {
        this.subTreeCost = cost;
    }
}
