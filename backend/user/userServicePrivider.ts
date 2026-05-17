import { PrismaSqliteService } from '../db_client/prismaSqliteService';
import { UserRepository } from './repositories/userRepository';
import { UserService } from './services/userService';
import { UserServiceImpl } from './services/userServiceImpl';

export class UserServiceProvider {
    private static userService: UserService;

    public static getUserService(): UserService {
        if (!UserServiceProvider.userService) {
            const prisma = PrismaSqliteService.getDBClient();
            const repository = new UserRepository(prisma);
            UserServiceProvider.userService = new UserServiceImpl(repository);
        }
        return UserServiceProvider.userService;
    }
}

export const userServiceProvider = UserServiceProvider.getUserService();
