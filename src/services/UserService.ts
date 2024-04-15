import { userRepository } from "../repositories/UserRepository";
import { CreateUserRequest } from "../models/CreateUserRequest";
import { UserResponse } from "../models/UserReponse";

class UserService {
    async create(user: CreateUserRequest): Promise<UserResponse> {
        const userReponse = await this.findUserByEmail(user.email);

        if (userReponse) {
            throw new Error('User already exists!')
        }

        const newUser = await userRepository.createUser(user);
        return newUser
    }

    async findUserByEmail(email: string) {
        const user = await userRepository.findUserByEmail(email)
        return user
    }
}

const userService = new UserService();

export { userService }