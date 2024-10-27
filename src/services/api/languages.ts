import { client } from "./api";
import { Language } from "@/interfaces/languages";

export async function getLanguages() {
  const { data } = await client.get<Language[]>("/languages");
  return data;
}
