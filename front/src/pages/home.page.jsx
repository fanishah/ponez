import { Link } from "react-router";

function Home() {
  return (
    <div className="w-5/12 text-center pt-16 mx-auto text-zinc-300">
      <img className="m-auto w-16" src="/logo1.png" alt="پونز" />
      <p className="pt-5">پونز، ﭘﺎﯾﮕﺎه ﺧﺮﯾﺪ و ﻓﺮوش ﺑﯽ‌واﺳﻄﻪ‌!</p>
      <p>
        اﮔﻪ دﻧﺒﺎل ﭼﯿﺰی ﻫﺴﺘﯽ، ﺷﻬﺮت رو اﻧﺘﺨﺎب ﮐﻦ و ﺗﻮ دﺳﺘﻪ‌ﺑﻨﺪی‌ﻫﺎ ﺑﻪ دﻧﺒﺎﻟﺶ ﺑﮕﺮد.
        اﮔﺮ ﻫﻢ ﻣﯽ‌ﺧﻮای ﭼﯿﺰی ﺑﻔﺮوﺷﯽ، ﭼﻨﺪ ﺗﺎ ﻋﮑﺲ ﺧﻮب ازش ﺑﮕﯿﺮ و آﮔﻬﯿﺖ رو ﺑﭽﺴﺒﻮن ﺑﻪ
        پونز.
      </p>
      <div className="relative bg-zinc-700 rounded-xl w-full mt-10 mb-7">
        <label htmlFor="Search" className="sr-only">
          جستجو...
        </label>
        <input
          type="text"
          id="Search"
          placeholder="جستجوی شهر"
          className="w-full rounded-md border-zinc-200 py-2.5 ps-3 pe-10 shadow-xs sm:text-sm outline-0"
        />
        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button
            type="button"
            className="text-zinc-100 hover:text-zinc-100 transition-all"
          >
            <span className="sr-only"> جستجو...</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
      <div className="space-y-2">
        <h1 className="text-right font-bold text-lg my-5">شهرهای پربازدید</h1>
        <div className="flex justify-around">
          <Link className="py-2 px-6 hover:text-zinc-100 transition-all">
            تهران
          </Link>
          <Link className="py-2 px-6 hover:text-zinc-100 transition-all">
            کرج
          </Link>
          <Link className="py-2 px-6 hover:text-zinc-100 transition-all">
            مشهد
          </Link>
          <Link className="py-2 px-6 hover:text-zinc-100 transition-all">
            اصفهان
          </Link>
          <Link className="py-2 px-6 hover:text-zinc-100 transition-all">
            شیراز
          </Link>
        </div>
        <div className="flex justify-around">
          <Link className="py-2 px-6 hover:text-zinc-100 transition-all">
            اهواز
          </Link>
          <Link className="py-2 px-6 hover:text-zinc-100 transition-all">
            قم
          </Link>
          <Link className="py-2 px-6 hover:text-zinc-100 transition-all">
            رشت
          </Link>
          <Link className="py-2 px-6 hover:text-zinc-100 transition-all">
            کرمانشاه
          </Link>
          <Link className="py-2 px-6 hover:text-zinc-100 transition-all">
            تبریز
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
