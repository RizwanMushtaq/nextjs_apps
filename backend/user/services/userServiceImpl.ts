import {
    CreateUserInput,
    UpdateUserInput,
    UserDomainModel,
} from '../domain/userDomain';
import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

export class UserServiceImpl {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(): Promise<UserDomainModel[]> {
        return this.userRepository.getAllUsers();
    }

    async getUserById(id: string): Promise<UserDomainModel> {
        return await this.userRepository.getUserById(id);
    }

    async createUser(input: CreateUserInput): Promise<UserDomainModel> {
        const { password } = input;
        const hashedPassword = await this.hashPassword(password);
        return this.userRepository.createUser({
            ...input,
            password: hashedPassword,
        });
    }

    async updateUser(
        id: string,
        input: UpdateUserInput
    ): Promise<UserDomainModel> {
        return await this.userRepository.updateUser(id, input);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.deleteUser(id);
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
}
