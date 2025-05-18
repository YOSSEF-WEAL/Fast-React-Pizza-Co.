import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="bg-yellow-500 uppercase px-4 py-3 border-b border-stone-200	sm:px-6 flex it justify-between items-center flex-wrap headerApp">
      <div>
        <Link className="tracking-widest" to="/">
          Fast React Pizza Co.
        </Link>
      </div>
      <div>
        <SearchOrder />
      </div>

      <div>
        <Username />
      </div>
    </header>
  );
}

export default Header;
