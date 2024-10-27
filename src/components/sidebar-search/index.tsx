import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { SimpleSearch } from "./simple-search";
import { AdvancedSearch } from "./advanced-search";
import { useRadioSearch } from "@/hooks/use-radio-search";
import { RadioList } from "./radio-list";

export function SearchRadios() {
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");
  const {
    simpleSearch,
    advancedParams,
    loading,
    radios,
    hasMore,
    handleSimpleSearchChange,
    handleAdvancedParamChange,
    handleAdvancedSearch,
    loadMore,
  } = useRadioSearch();

  const handleTabChange = (value: string) => {
    setActiveTab(value as "simple" | "advanced");
  };

  const hasSearched =
    activeTab === "simple"
      ? simpleSearch.length > 0
      : Object.values(advancedParams).some((v) => v.length > 0);

  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="simple" onValueChange={handleTabChange}>
        <TabsList className="w-full">
          <TabsTrigger value="simple">Busca simples</TabsTrigger>
          <TabsTrigger value="advanced">Busca avançada</TabsTrigger>
        </TabsList>
        <TabsContent value="simple">
          <SimpleSearch
            value={simpleSearch}
            onChange={handleSimpleSearchChange}
          />
        </TabsContent>
        <TabsContent value="advanced">
          <AdvancedSearch
            params={advancedParams}
            onParamChange={handleAdvancedParamChange}
            onSearch={handleAdvancedSearch}
            disabled={Object.values(advancedParams).every((v) => !v)}
          />
        </TabsContent>
      </Tabs>
      <Separator />
      <RadioList
        radios={radios}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        tab={activeTab}
        hasSearched={hasSearched}
      />
    </div>
  );
}
