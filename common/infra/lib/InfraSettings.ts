import * as commonSettings from '../infra.common.json';

export interface IInfraConfiguration{
  account: string;
  siteUrl: string;
  apiUrl: string;
  branch?: string;
  tagFilter?: string;
}

export interface IInfraSettings {
  [key: string]: string | number | boolean | {} | [];
  region: string;
  dnsCertificates: {[key: string]: string};
  configurations: {[key: string]: IInfraConfiguration};
}

const infraSettings = commonSettings as IInfraSettings;
export {infraSettings};

export function getDnsCertificateArn(domain: string): string {
  const dnsCertificates = infraSettings.dnsCertificates;
  if (!(domain in dnsCertificates)) {
    return "";
  }
  else {
    return dnsCertificates[domain];
  }
}
