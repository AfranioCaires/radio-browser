import { RadioStation } from "@/interfaces/radio-data";
import { client } from "./api";

interface GetRadiosParams {
  name: string;
  country?: string;
  language?: string;
  offset?: number;
  limit?: number;
}

export async function getRadios({
  name,
  country,
  language,
  offset = 0,
  limit = 10,
}: GetRadiosParams) {
  const params = new URLSearchParams();

  if (country) params.append("country", country);
  if (language) params.append("language", language);
  if (name) params.append("name", name);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  const { data } = await client.get<RadioStation[]>(
    `stations/search?${params.toString()}`
  );
  return data;
}
