import { CreateUserRequest } from '../models/CreateUserRequest';
import { UserResponse } from '../models/UserReponse';

export interface IUserRepository {
    create(user: CreateUserRequest): Promise<UserResponse>;
    findByEmail(email: string): Promise<UserResponse | null>;
    findAll(): Promise<UserResponse[]>;
    comparePassword(userPassword: string, candidatePassword: string): Promise<boolean>;
}
