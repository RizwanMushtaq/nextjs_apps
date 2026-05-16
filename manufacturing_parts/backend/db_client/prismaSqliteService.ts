import { PrismaClient } from '@/generated/prisma/client';
import { DatabaseClient } from './databaseClient';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { appEnv } from '@/shared/utils/env';

declare global {
    var __prismaClientInstance: PrismaClient | undefined;
}

export class PrismaSqliteService implements DatabaseClient<PrismaClient> {
    private static instance: PrismaSqliteService | null = null;
    private client: PrismaClient | null = null;

    private constructor() {
        const databaseUrl = appEnv.DATABASE_URL;
        if (!databaseUrl) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        this.client =
            globalThis.__prismaClientInstance ??
            new PrismaClient({
                adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
            });

        if (appEnv.NODE_ENV !== 'production') {
            globalThis.__prismaClientInstance = this.client;
        }
    }

    public static getInstance(): PrismaSqliteService {
        if (!PrismaSqliteService.instance) {
            PrismaSqliteService.instance = new PrismaSqliteService();
        }
        return PrismaSqliteService.instance;
    }

    getDBClient(): PrismaClient {
        if (!this.client) {
            throw new Error('Prisma client is not initialized');
        }
        return this.client;
    }
}
