import { PrismaClient } from '@/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { appEnv } from '@/shared/utils/env';

declare global {
    var __prismaClientInstance: PrismaClient | undefined;
}

export class PrismaSqliteService {
    private static client: PrismaClient;

    public static getDBClient(): PrismaClient {
        const databaseUrl = appEnv.DATABASE_URL;
        if (!databaseUrl) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        PrismaSqliteService.client =
            globalThis.__prismaClientInstance ??
            new PrismaClient({
                adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
            });

        if (appEnv.NODE_ENV !== 'production') {
            globalThis.__prismaClientInstance = PrismaSqliteService.client;
        }
        return PrismaSqliteService.client;
    }
}
