import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
        </Link>
      </div>
      <SearchInput />
      <div className="flex gap-3 items-center pl-6">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
