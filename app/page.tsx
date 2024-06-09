"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected]);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Upload &&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Share&nbsp;</h1>
        <br />
        <h1 className={title()}>any file easily.</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Build using Apillon platform.
        </h2>
      </div>

      <div className="flex gap-3">
        <ConnectKitButton />
        {/* <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link> */}
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="flat">
          <span>
            Connect your wallet to get started.
            {/* <Code color="primary">app/page.tsx</Code> */}
          </span>
        </Snippet>
      </div>
    </section>
  );
}
