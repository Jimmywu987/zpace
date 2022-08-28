import Link from "next/link";

export const NavLink = ({ text, url }: { text: string; url: string }) => {
  return (
    <Link href={url} passHref>
      <a className="text-lg text-link-normal transition hover:bg-link-bgHover hover:scale-110 hover:text-red-500 py-2 px-2.5 rounded">
        {text}
      </a>
    </Link>
  );
};
