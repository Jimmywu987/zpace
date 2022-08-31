import MetaTags from "@/features/head/components/Metatags";
import Link from "next/link";
import failGif from '@/../public/assets/404.gif'

export default function Custom404() {
  return (
    <main>
      <MetaTags title="Oops! User not found | ZPACE" />
      <div className="flex my-10 mx-5 items-center gap-12">
        <span className="leading-loose">
          <h1 className="my-10 font-extrabold text-9xl text-violet-500 drop-shadow-lg">
            Oops!
          </h1>
          <p>That page does not seem to exist...</p>
          <p>Error code: 404</p>
          <p>Here are some helpful links instead: </p>
          <ul>
            <li>
              <Link href="/">
                <p className="text-violet-500 underline">Home</p>
              </Link>
            </li>
            <li>
              <Link href="/">
                <p className="text-violet-500 underline">Search</p>
              </Link>
            </li>
            <li>
              <Link href="/">
                <p className="text-violet-500 underline">Profile</p>
              </Link>
            </li>
          </ul>
        </span>

        <img src={failGif.src} alt="oops" />
      </div>
      <div className="flex justify-center m-2">
        <Link href="/">
          <button className="btn-blue p-3 cusor-pointer ">Back to home</button>
        </Link>
      </div>
    </main>
  );
}
