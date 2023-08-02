export interface IFeature {
  enabled?: boolean;
}

export interface IForm {
  id?: string;
  name?: string;
}

export interface IProjectConfiguration {
  features?: {
    [key: string]: IFeature;
  };
  forms?: {
    [key: string]: IForm;
  };
}

export interface IConfigurationData {
  projectConfiguration?: IProjectConfiguration;
}
