import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import type { Dispatch, SetStateAction } from "react";

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
  start: string;
  end: string;
  package: string;
  downloads: PkgDownload[];
};

export type PkgDownload = {
  downloads: number;
  day: string;
};

export type ChartDataNivo = {
  id: string;
  color?: string;
  data: {
    x: string;
    y: number;
  }[];
};

export enum DURATION {
  LAST_WEEK = "last-week",
  LAST_MONTH = "last-month",
  LAST_YEAR = "last-year",
}

export type SetState<T> = Dispatch<SetStateAction<T>>;
