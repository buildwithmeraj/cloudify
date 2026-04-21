"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LABELS = {
  dashboard: "Dashboard",
  files: "Files",
  cloudinary: "Cloudinary",
  keys: "Keys",
  public: "Public",
  add: "Add",
  docs: "Docs",
};

function toTitleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [{ label: "Home", href: "/" }];
  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    crumbs.push({
      label: LABELS[segment] || toTitleCase(decodeURIComponent(segment)),
      href: currentPath,
    });
  });

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href}>
              {isLast ? <span>{crumb.label}</span> : <Link href={crumb.href}>{crumb.label}</Link>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
