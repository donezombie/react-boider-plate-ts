export interface App {
  id: string;
  name: string;
  developerName: string;
  summary: string;
  icon: string;
}

export interface AppIntegration {
  id: string;
  ownerUserId: string;
  developerName: string;
  developerDescription: string;
  appType: number;
  loginRedirectUri: string;
  logoutRedirectUri: string;
  scopes: string;
  name: string;
  icon: string;
  supportEmail: string;
  phone: string;
  homepage: string;
  launchUri: string;
  termsConditionsUri: string;
  privacyPolicyUri: string;
  summary: string;
  description: string;
  isLive: boolean;
  isApproved: boolean;
}
