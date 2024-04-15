import { PrismaClient, User } from '@prisma/client';
import { hash, compare } from 'bcrypt';

class UserRepository {
    private prisma = new PrismaClient();

    public async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    async createUser(email: string, plainTextPassword: string): Promise<User> {
        const password = await hash(plainTextPassword, 10); // Hash da senha com bcrypt
        const user = await this.prisma.user.create({
            data: {
                email,
                password,
            },
        });
        return user;
    }

    // refatorar
    validatePassword(password: string, passwordReceived: string): boolean {
        return password === passwordReceived;
    }

    async comparePassword(userPassword: string, candidatePassword: string): Promise<boolean> {
        return await compare(candidatePassword, userPassword);
      }
}

const userRepository = new UserRepository();

export { userRepository }
