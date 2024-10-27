import { Country } from "@/interfaces/countries-data";
import { client } from "./api";

export async function getCountries() {
  const { data } = await client.get<Country[]>("/countries");
  return data;
}
