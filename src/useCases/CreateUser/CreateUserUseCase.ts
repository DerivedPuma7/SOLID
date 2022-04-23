import User from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import IUsersRepository from "../../repositories/IUsersRepository";
import ICreateUserRequestDTO from "./CreateUserDTO";

class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = new User(data);
        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe do Meu App',
                email: 'equipe@meuapp.com'
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<h3> Você já pode fazer login em nossa plataforma. </h3>'
        });
    }
}   

export default CreateUserUseCase;

//[en]
/**
    -- Single Responsability Principle.
    The only responsability of our useCase is to receive data of any user and save this user,
    whether is in an array, a json file, a database, external api, it does't matter where.
    Any systems's need of creating an user, this useCase will be enought.
    - easy to mantain
    - easy to understand
    - easy to test

    -- Liskov Substitution Principle.
    Since our 'usersRepository' is of an interface type, it does't matter witch repository we are using,
    as long it follows/implements this interface.

    -- Dependency Inversion Principle
    We are not depending on the implementation of our repository, but on its abstraction. let's say
    we will work with a MySQL database and a SQL Server. The implementations of an insert, update, delete
    are different. However, our useCase doesn't care about these distinct implementations, since
    that each repository follows the interface, the contract.
    For the case of sending email, it's the same thing. We do not know how this email is sent, if it is
    with a service from Amazon, Google, Microsoft, etc. The only important point is for him to understand and follow
    the protocol for sending this email, which is established by the interface.

    The Liskov Substitution Principle, the Dependency Inversion Principle and the Open Closed Principle
    walk together. According to Robert C. Martin (Uncle Bob), the correct implementation of OCP
    and the LSP result in the DIP.

 */

// [pt-br]
/**
    -- Single Responsability Principle.
    A única responsabilidade dela é receber dados de um usuário qualquer e salvar este usuário, 
    seja em um array, arquivo json, banco de dados, api externa, não importa onde.
    Qualquer necessidade do sistema que precise criar um usuário, esse useCase vai ser suficiente.
    - Manutenção facilitada
    - Testes facilitados
    - Compreensão facilitada

    -- Liskov Substitution Principle.
    A partir do momento que o nosso 'usersRepository' é do tipo de uma interface, não importa qual
    repositório estamos usando, desde que ele siga essa interface.

    -- Dependency Inversion Principle
    Não estamos dependendo da implementação do nosso repositório, e sim da sua abstração. Digamos que 
    vamos trabalhar com um banco MySQL e um SQL Server. As implementações de um insert, update, delete
    são diferentes. Entretanto, nosso useCase não se importa com essas implementações distintas, desde
    que cada repositório siga a interface, o contrato.
    Para o caso do envio de email é a mesma coisa. Não sabemos como é feito esse envio de email, se é
    com um serviço da Amazon, Google, Microsoft, etc. O único ponto importante é ele entender e seguir
    o protocolo de envio desse email, que é estabelecido pela interface.

    O Liskov Substitution Principle, o Dependency Inversion Principle e o Open Closed Principle
    caminham juntos. Segundo Robert C. Martin (Uncle Bob), a implementação correta do OCP
    e do LSP resultam no DIP.
 */