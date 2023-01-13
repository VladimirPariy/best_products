import React, { FC } from "react";

import SearchInput from "components/search/components/search-input";
import SearchResult from "components/search/components/search-result";
import SearchWrapper from "components/search/components/search-wrapper";

const SearchBar: FC = () => {
  return (
    <SearchWrapper>
      <SearchInput>
        <SearchResult />
      </SearchInput>
    </SearchWrapper>
  );
};

export default SearchBar;
