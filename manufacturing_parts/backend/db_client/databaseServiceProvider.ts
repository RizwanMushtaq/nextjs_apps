import { nodeEnv, appEnv } from '@/shared/utils/env';
import { DatabaseClient } from './databaseClient';
import { PrismaSqliteService } from './prismaSqliteService';
import { PrismaClient } from '@/generated/prisma/client';

let serviceProvider: DatabaseClient<PrismaClient> | null = null;

if (
    appEnv.NODE_ENV === nodeEnv.development ||
    appEnv.NODE_ENV === nodeEnv.production
) {
    serviceProvider = PrismaSqliteService.getInstance();
}

if (!serviceProvider) {
    throw new Error(
        'No database service provider available for the current environment'
    );
}

export const dbServiceProvider = serviceProvider.getDBClient();
