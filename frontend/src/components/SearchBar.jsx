import { Input } from "@/components/ui/input"

const SearchBar = () => {
    return <Input className = {`text-white bg-neutral-700 hover:bg-neutral-500 placeholder:text-neutral-200 placeholder:hover:text-white ease-out duration-100`} type="email" placeholder="Search Company, country, domain..." />
};

export default SearchBar;