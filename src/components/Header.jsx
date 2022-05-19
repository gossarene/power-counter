import React from "react";

function Header() {

  return (
    <div className=" bg-[#081730] flex items-start  px-[5rem] pt-[2.4rem] text-[0.8rem]">
      {/* logo */}
      <img
        src={require("../img/logo.png")}
        alt=""
        className=" w-[42px] h-[42px]"
      />

      <div className="menu flex">
        <ul className='flex w-[100%] justify-between'>
          <li className="ml-[0.5rem] mt-3 hover:cursor-pointer">Power counter</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
