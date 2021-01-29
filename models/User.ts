export type User = {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: any;
  multiFactor: any;
  phoneNumber: string;
  photoURL: string;
  providerData: any;
  providerId: string;
  refreshToken: string;
  tenantId: string;
};
