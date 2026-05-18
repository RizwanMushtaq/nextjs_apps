import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client';
import 'dotenv/config';
import { createLargeTree } from './seedHelper';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL environment variable is not set.');
    process.exit(1);
}

const adapter = new PrismaBetterSqlite3({
    url: connectionString,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    const nodes = createLargeTree(10000);

    const user1 = await prisma.user.upsert({
        where: { email: 'user1@example.com' },
        update: {},
        create: {
            name: 'User 1',
            email: 'user1@example.com',
            password: await bcrypt.hash('password1', 10),
        },
    });

    console.log(user1);

    await prisma.part.deleteMany({});
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const part = await prisma.part.upsert({
            where: { id: node.getId() },
            update: {},
            create: {
                id: node.getId(),
                parentId: node.getParentId(),
                description: node.getDescription(),
                quantityPerParent: node.getQuantityPerParent(),
                materialCost: node.getMaterialCost(),
                manufacturingCost: node.getManufacturingCost(),
                directCost: node.getDirectCost(),
                subTreeCost: node.getSubTreeCost(),
            },
        });
        console.log(part);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
