import { NodePart } from '@/backend/part/domain/NodePart';

export function createLargeTree(targetNodeCount: number = 10000): NodePart[] {
    const childrenPerNode = 1; // TODO: As of now Logic works only for 1 child per node, need to update logic for more children per node
    const nodes: NodePart[] = [];

    let nodeId = 1;
    const quantityPerParent = Math.floor(Math.random() * 10) + 1;
    const materialCost = Math.random() * 10;
    const manufacturingCost = Math.random() * 10;
    const directCost = quantityPerParent * (materialCost + manufacturingCost);
    const subTreeCost = 0;

    const root = new NodePart(
        nodeId.toString(),
        null,
        'Root Node',
        quantityPerParent,
        materialCost,
        manufacturingCost,
        directCost,
        subTreeCost
    );
    nodes.push(root);

    let currentIndex = 0;
    while (nodes.length < targetNodeCount) {
        const parent = nodes[currentIndex];
        for (let i = 0; i < childrenPerNode; i++) {
            nodeId++;
            const quantityPerParent = Math.floor(Math.random() * 10) + 1;
            const materialCost = Math.random() * 10;
            const manufacturingCost = Math.random() * 10;
            const directCost =
                quantityPerParent * (materialCost + manufacturingCost);
            const subTreeCost = 0;
            const child = new NodePart(
                nodeId.toString(),
                parent.getId(),
                'Node Description ' + nodeId,
                quantityPerParent,
                materialCost,
                manufacturingCost,
                directCost,
                subTreeCost
            );
            parent.addChild(child);
            nodes.push(child);
        }
        const parentSubTreeCost = parent
            .getChildren()
            .reduce((acc, child) => acc + child.getDirectCost(), 0);
        parent.setSubTreeCost(parentSubTreeCost);
        currentIndex++;
    }
    return nodes;
}

// Test the function
// function main() {
//     const nodes = createLargeTree(10000);
//     console.log(nodes);
// }

// main();
