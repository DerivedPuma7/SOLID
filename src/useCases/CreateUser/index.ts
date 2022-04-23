import MailTrapMailProvider from "../../providers/Implementations/MailTrapMailProvider";
import PostgressUsersRepository from "../../repositories/Implementations/PostgressUsersRepository";
import CreateUserController from "./CreateUserController";
import CreateUserUseCase from "./CreateUserUseCase";

const postgressUsersRepository = new PostgressUsersRepository();
const mailTrapMailProvider = new MailTrapMailProvider();

const createUserUseCase = new CreateUserUseCase(postgressUsersRepository, mailTrapMailProvider);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase };