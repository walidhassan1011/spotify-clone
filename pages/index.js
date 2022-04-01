import { getSession } from "next-auth/react";
import Center from "../components/Center";
import Player from "../components/Player";
import Siderbar from "../components/Siderbar";

export default function Home() {
  return (
    <div className="bg-black overflow-hidden h-screen ">
      <main className=" flex">
        <Siderbar />
        <Center />
      </main>
      <Player />
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
