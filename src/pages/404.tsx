import MetaTags from "@/../components/Metatags";
import Link from "next/link";

export default function Custom404() {
  return (
    <main>
      <MetaTags title="Oops! User not found | ZPACE" />
      <h1 style={{ textAlign: "center" }}>
        404 - That page does not seem to exist...
      </h1>
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen
        style={{ margin: "0 auto", display: "block" }}
      ></iframe>
      <div className="flex justify-center m-2">
        <Link href="/">
          <button className="btn-blue p-3 cusor-pointer ">Back to home</button>
        </Link>
      </div>
    </main>
  );
}
