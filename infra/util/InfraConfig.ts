export interface StageConfig {
  domain: string;
}

export interface GraphqlConfig {
  containerPort: number;
}

export interface InfraConfig {
  dnsCertificates: { [key: string]: string };
  stages: { [key: string]: StageConfig };
  graphql: GraphqlConfig;
}
