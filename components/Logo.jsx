import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="relative text-4xl font-semibold dark:text-white text-slate-700"
    >
      <span className="text-green-600 dark:text-green-500">D</span>arté
      <span className="text-green-600 dark:text-green-500 text-5xl leading-0">
        .
      </span>
      <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
        plus
      </p>
    </Link>
  );
}
