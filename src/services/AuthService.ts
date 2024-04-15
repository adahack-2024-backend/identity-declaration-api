import { error } from 'console';
import { UserRepository } from '../repositories/UserRepository';

export class AuthService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

     async login(email:string, password:string) {
         const user = await this.userRepository.findUserByEmail(email)
         if (!user){
            throw new Error ('Usuário não encontrado')
         }
         if (this.userRepository.validatePassword (password, user.password)){
            throw new Error ('Senha incorreta')
         }
}

}
