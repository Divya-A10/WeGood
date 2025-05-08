import React from 'react';

const Page2 = () => {
  const handleContinueClick = () => {
    // Add your logic for handling the continue click (e.g., navigate to the quiz page or start a quiz API request)
    console.log("Continue button clicked");
  };

  return (
    <div className="relative w-[1434px] h-[804px] bg-white">
      <img
        className="absolute w-full h-full top-0 left-0"
        src="https://placehold.co/1434x804"
        alt="Background"
      />
      <div className="absolute w-[780px] h-[396px] left-[305px] top-[105px] flex flex-col justify-start items-center gap-8">
        <div className="text-center text-[#FFFDF8] text-8xl font-modak font-normal leading-[140.80px] tracking-normal text-shadow-lg">
          Take the Mental Health Quiz
        </div>
      </div>
      <div
        onClick={handleContinueClick}
        className="absolute w-[312px] h-[107px] left-[561px] top-[541px] flex justify-center items-center gap-4 bg-white bg-opacity-20 rounded-full cursor-pointer"
      >
        <div className="text-center text-black text-4xl font-roboto-mono font-bold">
          Continue
        </div>
        <div className="relative">
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.5117 19.3183L31.5483 11.355C31.0717 10.8785 30.3549 10.7359 29.7322 10.9938C29.1095 11.2517 28.7035 11.8593 28.7033 12.5333V17.58C28.7033 17.8101 28.5168 17.9966 28.2867 17.9966H2.5C1.11929 17.9966 0 19.1159 0 20.4966C0 21.8773 1.11929 22.9966 2.5 22.9966H28.2867C28.5168 22.9966 28.7033 23.1832 28.7033 23.4133V28.46C28.7035 29.134 29.1095 29.7415 29.7322 29.9994C30.3549 30.2573 31.0717 30.1148 31.5483 29.6383L39.5117 21.675C40.1623 21.0241 40.1623 19.9691 39.5117 19.3183Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Page2;
