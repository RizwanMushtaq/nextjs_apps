import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client';
import 'dotenv/config';
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
    const user1 = await prisma.user.upsert({
        where: { email: 'user1@example.com' },
        update: {},
        create: {
            name: 'User 1',
            email: 'user1@example.com',
            password: await bcrypt.hash('password1', 10),
        },
    });
    const user2 = await prisma.user.upsert({
        where: { email: 'user2@example.com' },
        update: {},
        create: {
            name: 'User 2',
            email: 'user2@example.com',
            password: await bcrypt.hash('password2', 10),
        },
    });
    console.log({ user1, user2 });

    const part1 = await prisma.part.upsert({
        where: { part_code: 'PART001' },
        update: {},
        create: {
            part_code: 'PART001',
            name: 'Part 1',
            description: 'Description for Part 1',
        },
    });
    const part2 = await prisma.part.upsert({
        where: { part_code: 'PART002' },
        update: {},
        create: {
            part_code: 'PART002',
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
