import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <main className="flex w-full max-w-3xl flex-col items-start justify-between gap-12 bg-white px-6 py-12 dark:bg-black sm:px-12 md:px-16 md:py-24">
        <Image
          className="dark:invert"
          src="/buho.png"
          alt="Oil Prices logo"
          width={80}
          height={80}
          priority
        />

        <div className="flex flex-col items-start gap-4 text-left sm:gap-6">
          <h1 className="max-w-xs text-3xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl sm:leading-snug">
            Olive Oil Prices Tracker
          </h1>
          <p className="max-w-md text-base leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-lg">
            Real-time olive oil prices from the Spanish market. Updated daily
            from Infaoliva.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:gap-4">
          <Link
            className="flex h-10 items-center justify-center rounded-full bg-neutral-900 px-5 font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-black dark:hover:bg-neutral-300"
            href="/prices"
          >
            View Prices
          </Link>
          <a
            className="flex h-10 items-center justify-center rounded-full border border-neutral-200 px-5 font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
            href="https://www.infaoliva.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infaoliva Source
          </a>
        </div>
      </main>
    </div>
  );
}
