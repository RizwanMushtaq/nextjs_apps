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
    const user1 = await prisma.user.upsert({
        where: { email: 'user1@example.com' },
        update: {},
        create: {
            name: 'User 1',
            email: 'user1@example.com',
            password: 'password1',
        },
    });
    const user2 = await prisma.user.upsert({
        where: { email: 'user2@example.com' },
        update: {},
        create: {
            name: 'User 2',
            email: 'user2@example.com',
            password: 'password2',
        },
    });
    console.log({ user1, user2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
