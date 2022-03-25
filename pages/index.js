import Center from "../components/Center";
import Siderbar from "../components/Siderbar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className=" flex">
        <Siderbar />
        <Center />
      </main>
    </div>
  );
}
