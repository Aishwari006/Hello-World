import { RefObject } from "react";

export type RegistryItem = {
  ref?: RefObject<HTMLElement>;
  speech: string;
  route?: string;
};

export type Registry = Record<string, RegistryItem>;