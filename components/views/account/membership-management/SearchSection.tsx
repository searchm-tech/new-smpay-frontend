import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/composite/input-components";
import { LinkButton } from "@/components/composite/button-components";
import { SearchBox } from "@/components/common/Box";

// TODO : 타입 모듈화 필요
type SearchSectionProps = {
  role?: "admin" | "agency";
  onSearch: (keyword: string) => void;
};

const SearchSection = ({ role = "agency", onSearch }: SearchSectionProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = () => onSearch(keyword);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchBox className="justify-between">
      <div className="flex items-center gap-2">
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[300px]"
        />
        <Button onClick={handleSearch}>검색</Button>
      </div>

      <div className="flex items-center gap-2">
        <LinkButton onClick={() => router.push("/account/membership-register")}>
          회원 등록
        </LinkButton>

        {role === "agency" && (
          <LinkButton onClick={() => {}}>회원 삭제</LinkButton>
        )}
      </div>
    </SearchBox>
  );
};

export default SearchSection;
