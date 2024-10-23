import { firstValueFrom } from 'rxjs';
import { AuthenticationController } from '../../authentication/controllers/authentication.controller';
import { IUserGet } from '../../user/interfaces/user-get.interface';

export function AppInit(
  authenticationController: AuthenticationController,
): () => Promise<IUserGet | null> {
  return () => firstValueFrom(authenticationController.restoreSession());
}
