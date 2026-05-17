import {
    UpdateUserInput,
    CreateUserInput,
    UserDomainModel,
} from '../domain/userDomain';

export abstract class UserService {
    abstract getAllUsers(): Promise<UserDomainModel[]>;
    abstract getUserById(id: string): Promise<UserDomainModel>;
    abstract createUser(input: CreateUserInput): Promise<UserDomainModel>;
    abstract updateUser(
        id: string,
        input: UpdateUserInput
    ): Promise<UserDomainModel>;
    abstract deleteUser(id: string): Promise<void>;
}
