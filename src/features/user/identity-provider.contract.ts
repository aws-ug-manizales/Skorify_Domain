export abstract class IdentityProviderContract {
  abstract update(
    userId: string,
    password: string,
    data: {
      name: string;
      email: string;
    },
  ): Promise<void>;
}
