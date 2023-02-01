import React, { FC, useState } from "react";

import SearchInput from "components/search/components/search-input";
import SearchResult from "components/search/components/search-result";
import SearchWrapper from "components/search/components/search-wrapper";

const SearchBar: FC = () => {
  const [search, setSearch] = useState("");

  return (
    <SearchWrapper>
      <SearchInput search={search} setSearch={setSearch}>
        <SearchResult setSearch={setSearch} />
      </SearchInput>
    </SearchWrapper>
  );
};

export default SearchBar;
