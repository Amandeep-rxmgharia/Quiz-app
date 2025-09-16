import  { useEffect } from "react";
import HeroImg from "../src/assets/heroImg.svg";
import data from "../src/data";
import correct from "../src/assets/correct.svg";
import wrong from "../src/assets/wrong.svg";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useLocal } from "../src/hooks/useLocal";

export default function Test() {
  const [ques, setQues] = useLocal("ques", 0);
  const [testData, setData] = useLocal("testData", data[ques]);
  const [userOption, setOption] = useLocal("userOption", null);
  const [symbol, setSymbol] = useLocal("symbol", null);
  const [, setPoints] = useOutletContext();
  const [time, setTime] = useLocal("time", 30);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);
  if (time == 0) {
    navigate("/result");
  }

  useEffect(() => {
    Array.from(document.querySelector("#option-cont").children).forEach(
      (child) => {
        if (!userOption) {
          child.style.border = "2px solid #b4b4b4";
          child.children[1].src = "";
        }
        if (
          userOption == child.textContent &&
          child.textContent == testData.rightAns
        ) {
          child.style.border = "2px solid #197e1edd";
          child.children[1].src = correct;
        }
        if (
          userOption == child.textContent &&
          child.textContent != testData.rightAns
        ) {
          child.style.border = "2px solid #FF7A7A";
          child.children[1].src = wrong;
          Array.from(child.parentElement.children).forEach((option) => {
            if (option.textContent == testData.rightAns) {
              option.style.border = "2px solid #197e1edd";
              option.children[1].src = correct;
            }
          });
        }
      },
    );
  });
  const options = testData.options.map((option, i) => {
    return (
      <div
        key={i}
        onClick={(e) => {
          if (!userOption) {
            if (e.target.textContent == testData.rightAns) {
              e.target.style.border = "2px solid #197e1edd";
              e.target.children[1].src = correct;
              setPoints((previous) => previous + 1);
            } else {
              e.target.style.border = "2px solid #FF7A7A";
              e.target.children[1].src = wrong;
              Array.from(e.target.parentElement.children).forEach((option) => {
                if (option.textContent == testData.rightAns) {
                  option.style.border = "2px solid #197e1edd";
                  option.children[1].src = correct;
                }
              });
            }
            setOption(e.target.textContent);
          }
        }}
        className={`flex cursor-pointer justify-between rounded-sm border-2 border-[#b4b4b4] px-4 py-3`}
      >
        <span className="pointer-events-none">{option}</span>
        <img className="max-w-5" src={symbol} alt="" />
      </div>
    );
  });
  useEffect(() => {
    setData(data[ques]);
  }, [ques]);

  return (
    <main className="bg-[#CCE2C2]">
      <section className="mx-auto h-screen max-w-[900px] p-4">
        <header className="flex items-center justify-between">
          <img className="max-w-42" src={HeroImg} alt="" />
          <div className="inline-block rounded-sm bg-[#FEC33D] p-1.5 text-xl font-bold">
            {`0${ques + 1}/05`}
          </div>
        </header>
        <div className="my-4 rounded-xl bg-[#F5F5F57A] px-8 py-10 font-semibold">
          {testData.ques}
        </div>
        <div className="flex justify-between text-white">
          <div className="inline-block rounded-sm bg-[#197e1edd] p-1 text-end text-xl font-semibold">
            <Link
              to={ques + 1 == data.length ? "/result" : ""}
              onClick={() => {
                if (userOption) {
                  if (ques + 1 < data.length) {
                    setQues((prev) => prev + 1);
                    setOption(null);
                    setTime(30);
                  }
                }
              }}
              className="cursor-pointer"
            >
              Next <i class="fa-solid fa-forward"></i>
            </Link>
          </div>
          <div className="inline-block rounded-sm bg-[#197e1edd] p-1 text-end text-xl font-semibold">
            {`00:${JSON.stringify(time).padStart(2, "0")}`}
          </div>
        </div>
        <div
          id="option-cont"
          className="mt-10 flex flex-col gap-3 rounded-xl bg-[#F5F5F57A] px-4 py-5 sm:mt-4"
        >
          {options}
        </div>
      </section>
    </main>
  );
}
