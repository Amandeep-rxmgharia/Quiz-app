import HeroImg from "../src/assets/heroImg.svg";
import { Link } from "react-router-dom";


export default function Home() {
  
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img className="max-w-[300px] sm:max-w-[400px]" src={HeroImg} alt="" />
      <Link onClick={() => {
              localStorage.clear()
            }} to='/test' className="max-w-max rounded-[3px] bg-green-500 px-7 py-1 sm:py-3 sm:mt-0 mt-4 text-xl sm:text-2xl font-semibold text-white shadow-[3px_3px_0px_3px_rgb(1,171,8)] sm:shadow-[4px_4px_0px_4px_rgb(1,171,8)]">
        Start Now &nbsp;<i class="fa-solid fa-truck-arrow-right"></i>
      </Link>
    </div>
  );
}
