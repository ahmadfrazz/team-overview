import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use_debounce";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiltersRowProps } from "@/types";

const FiltersRow: React.FC<
  FiltersRowProps & { initialName?: string; initialTeam?: string }
> = ({ handleFilterChange, teams, initialName = "", initialTeam = "all" }) => {
  const [query, setQuery] = useState(initialName);
  const [team, setTeam] = useState(initialTeam);

  const debouncedQuery = useDebounce(query, 500);

  // Sync internal state when URL-based props change
  useEffect(() => {
    setQuery(initialName);
  }, [initialName]);

  useEffect(() => {
    setTeam(initialTeam);
  }, [initialTeam]);

  useEffect(() => {
    handleFilterChange({ name: debouncedQuery, team });
  }, [debouncedQuery, team]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Input
        placeholder="Search by name"
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <Select value={team || "all"} onValueChange={setTeam}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by team" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Teams</SelectLabel>
            <SelectItem value="all">All Teams</SelectItem>
            {teams.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FiltersRow;
