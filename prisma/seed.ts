import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client';
import 'dotenv/config';

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
    const part1 = await prisma.part.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Part 1',
            description: 'Description for Part 1',
        },
    });
    const part2 = await prisma.part.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Part 2',
            description: 'Description for Part 2',
        },
    });
    console.log({ part1, part2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
