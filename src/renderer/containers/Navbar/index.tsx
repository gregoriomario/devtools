import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faCoffee,
  IconDefinition,
  faClock,
  faCode,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type NavbarProps = {
  className?: string;
};

type Property = {
  label: string;
  icon: IconDefinition;
  href: string;
};

const properties: Array<Property> = [
  {
    label: "Time Converter",
    icon: faClock,
    href: "/",
  },
  {
    label: "JSON to YAML",
    icon: faCode,
    href: "/json",
  },
  {
    label: "Image Resize",
    icon: faImage,
    href: "/resize",
  },
];

const Navbar = ({ className }: NavbarProps): JSX.Element => {
  return (
    <div className="bg-slate-800 w-[300px] min-h-screen text-slate-300 px-3 py-10">
      <div className="pb-3">
        <h1 className="text-lg font-semibold">Menu</h1>
      </div>
      <div>
        <ul>
          {properties.map((p) => {
            return (
              <Link
                to={p.href}
                key={p.label}
                className="rounded-lg py-2 px-2 hover:bg-slate-900 w-full text-sm flex items-center gap-x-2"
                role="button"
              >
                <FontAwesomeIcon icon={p.icon} />
                <span>{p.label}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
