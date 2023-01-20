import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { DbService } from 'src/db/db.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private db_service: DbService) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization;
            if (!token) throw new UnauthorizedException('Invalid access token');
            const access_token = token.replace("Bearer", "");
            const user_id = jwt_decode(access_token)["sub"];
            return this.db_service.user.findUnique({
                where: {
                    stytch_user_id: user_id
                }
            }).then((user) => {
                if (user) {
                    request.user = user;
                    return true;
                }
                throw new UnauthorizedException('Invalid access token');
            })
        } catch (error) {
            throw new UnauthorizedException('Unauthorized access')
        }
    }
}