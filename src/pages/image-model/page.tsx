import NavBar from "@/components/nav-bar";
import ImageAnalysis from "./component/image-analysis";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="absolute w-full top-0">
        <ImageAnalysis />
      </div>
    </>
  );
}
