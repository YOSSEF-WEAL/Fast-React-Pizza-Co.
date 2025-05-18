import React from "react";
import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const baseStyels =
    "bg-yellow-400 uppercase font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm";

  const styels = {
    primary: baseStyels + " px-4 py-3 sm:px-6 sm:y-4 ",
    small: baseStyels + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "bg-transparent border-2 border-stone-300 uppercase font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 sm:px-6 sm:y-3.5 text-sm",
    round: baseStyels + " px-2.5 py-2 md:px-3.5 md:py-2 text-lg",
  };

  if (to)
    return (
      <Link to={to} className={styels[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} className={styels[type]} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styels[type]}>
      {children}
    </button>
  );
}

export default Button;
