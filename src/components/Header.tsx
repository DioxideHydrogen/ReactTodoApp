import { HugeiconsIcon } from '@hugeicons/react'
import { Menu01Icon } from "@hugeicons/core-free-icons";

function Header() {
  return (
    <>
      <header className="bg-slate-600 text-white p-4">
        <div className="header__mobile flex items-center sm:hidden justify-between">
          <div className="header__left flex gap-1">
            <div className="header__user-picture w-10">
              <img src="https://i.pravatar.cc/300" className='rounded-full' alt="Profile Picture" />
            </div>
            <div className="header__user-informations text-sm">
              <p className='pb-0'>Welcome Back,</p>
              <p>Hugo Henrique</p>
            </div>
          </div>
          <div className="header__right">
            <div className="header__menu p-1 cursor-pointer">
              <HugeiconsIcon icon={Menu01Icon} size={24} color='currentColor' strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="header__desktop">

        </div>
			</header>
		</>
	);
}

export default Header