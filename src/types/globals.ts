import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";

export type OpenAIStreamPayload = {
  model: ChatGPTModel;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
};

export type ChatGPTModel =
  | "gpt-3.5-turbo"
  | "text-davinci-003"
  | "text-curie-001"
  | "text-babbage-001"
  | "text-ada-001";

export type ChatGPTAgent = "user" | "system";

export type ChatGPTMessage = {
  role: ChatGPTAgent;
  content: string;
};

export interface ExtendedNextRequest extends NextRequest {
  json: () => Promise<{
    requirement: string;
    framework: FRAMEWORK;
  }>;
}

export interface ExtendedNextApiRequestPkg extends NextApiRequest {
  body: {
    name: string;
  };
}

export enum FRAMEWORK {
  NOT_SPECIFIED = "Not specified",
  REACT = "React.js",
  SVELTE = "Svelte",
  VUE = "Vue.js",
  ANGULAR = "Angular",
  EXPRESS = "Express",
}

export type Package = {
  name?: string;
  repository?: string;
  downloads?: string;
  unpackedSize?: string;
  lastPublish?: string;
};

export type PkgData = {
  metadata: {
    date: string;
    dependencies: {
      [key: string]: string;
    };
    description: string;
    devDependencies: {
      [key: string]: string;
    };
    hasTestScript: boolean;
    keywords: string[];
    license: string;
    links: {
      bugs: string;
      homepage: string;
      npm: string;
      repository: string;
    };
    maintainers: {
      username: string;
      email: string;
    }[];
    name: string;
    peerDependencies: {
      [key: string]: string;
    };
    publisher: {
      username: string;
      email: string;
    };
    readme: string;
    releases: {
      from: string;
      to: string;
      count: number;
    }[];
    repository: {
      type: string;
      url: string;
    };
    scope: string;
    version: string;
  };
  npm: {
    downloads: {
      from: string;
      to: string;
      count: number;
    }[];
    starsCount: number;
  };
};
