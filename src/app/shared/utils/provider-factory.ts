import { firstValueFrom } from 'rxjs';
import { AuthenticationController } from '../../authentication/controllers/authentication.controller';
import { IUser } from '../../user/interfaces/user.interface';

export function AppInit(
  authenticationController: AuthenticationController,
): () => Promise<IUser | null> {
  return () => firstValueFrom(authenticationController.restoreSession());
}
