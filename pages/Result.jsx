
import { useOutletContext } from "react-router-dom";
import HeroImg from "../src/assets/heroImg.svg";
import data from '../src/data'
export default function Result() {
  const [points] = useOutletContext();
  const successFraction = points / data.length * 100
  const negPoints = parseInt(data.length - points)
  const negFraction = negPoints / data.length * 100
  return (    
    <section className="p-5">
      <div className="flex flex-col items-center">
        <img className="max-w-44" src={HeroImg} alt="" />
        <h1 className="text-2xl font-semibold">Result</h1>
        <div className="h-15 w-full max-w-[500px] rounded-sm flex mt-14">
          <div style={{width: `${successFraction}%`}} className={`h-full bg-[#35BD3A] rounded-tl-sm rounded-bl-sm`}></div>
          <div style={{width: `${negFraction}%`}} className={`h-full bg-[#FF7A7A] rounded-tr-sm rounded-br-sm`}></div>
        </div>
        <h5 className="mt-1 text-md font-semibold">{points}/{data.length}</h5>
        <p className="mt-25">“{points < 3 ? 'Work on yourself!' : 'Keep learning, you have a good score!'}”</p>
        <div onClick={() => {
              localStorage.clear()
            }} className="inline-block rounded-sm bg-[#35BD3A] py-1 px-4 text-end text-white text-xl mt-5 font-semibold">
            <a href="/test" 
              className="cursor-pointer"
            >
              Retry <i class="fa-solid fa-forward"></i>
            </a>
          </div>
      </div>
    </section>
  );
}
