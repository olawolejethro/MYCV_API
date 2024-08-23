import { Injectable ,BadRequestException} from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
    constructor (private usersService:UsersService){}

    async  signup(email :string,password:string){
//see if email is in use

const users = await this.usersService.find(email)
if(users.length){
    throw new BadRequestException('email already in use')
}
//password hashing 

    }

    signin(){

    }
}