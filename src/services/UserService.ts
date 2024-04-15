import { userRepository } from "../repositories/UserRepository";
import { UserModel } from "../models/UserModel";

class UserService {
    async create(email: string, password: string): Promise<UserModel> {
        const userEmail = await userRepository.findUserByEmail(email);

        if(userEmail) {
            throw new Error('User already exists!')
        }

        const newUser = await userRepository.createUser(email, password);

        return newUser
    }

    async findByEmail(email: string) {
        const user = await userRepository.findUserByEmail(email)
        return user
    }
}

const userService = new UserService();

export {userService}