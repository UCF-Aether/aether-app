export interface StageConfig {
  domain: string,
}

export interface InfraConfig {
  dnsCertificates: { [key: string]: string },
  stages: { [key: string]: StageConfig },
}
