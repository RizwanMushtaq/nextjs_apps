import { PartsService } from './services/partsService';
import { PrismaSqliteService } from '../db_client/prismaSqliteService';
import { PartsServiceImpl } from './services/partServiceImpl';
import { PrismaPartsRepository } from './repositories/prismaPartsRepository';

class PartsServiceProvider {
    private static partsService: PartsService;

    public static getPartsService(): PartsService {
        const prisma = PrismaSqliteService.getDBClient();
        const repository = new PrismaPartsRepository(prisma);
        PartsServiceProvider.partsService = new PartsServiceImpl(repository);
        return PartsServiceProvider.partsService;
    }
}

export const partsServiceProvider = PartsServiceProvider.getPartsService();
