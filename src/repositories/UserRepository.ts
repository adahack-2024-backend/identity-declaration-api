import { PrismaClient, User } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { CreateUserRequest } from '../models/CreateUserRequest';
import { UserResponse } from '../models/UserReponse';

class UserRepository {
    private prisma = new PrismaClient();

    public async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    async createUser(user: CreateUserRequest): Promise<UserResponse> {
        const email = user.email;
        const password = await hash(user.password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                email,
                password
            },
            select: {
                id: true,
                email: true
            }
        });
        return newUser;
    }

    async comparePassword(userPassword: string, candidatePassword: string): Promise<boolean> {
        return await compare(candidatePassword, userPassword);
      }
}

const userRepository = new UserRepository();

export { userRepository }
