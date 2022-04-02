import { getSession } from "next-auth/react";
import Center from "../components/Center";
import Player from "../components/Player";
import Siderbar from "../components/Siderbar";

import Head from "next/head";

export default function Home() {
  return (
    <div className="bg-black overflow-hidden h-screen ">
      <main className=" flex">
        <Head>
          <title>spotify-clone</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Siderbar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
