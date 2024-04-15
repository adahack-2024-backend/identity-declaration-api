import { PrismaClient } from '@prisma/client';
import { validate } from 'uuid';

export class UserRepository {
    private prisma = new PrismaClient();

    public async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

     validatePassword(password: string, passwordReceived: string) : boolean {
        return password === passwordReceived;
    }
}