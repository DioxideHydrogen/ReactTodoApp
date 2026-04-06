
function Header() {
	return (
		<>
			<header className="bg-slate-600 text-white p-4 flex flex-row justify-between items-center">
				<h1 className="text-3xl font-bold">My TODO App</h1>
        <ul className="flex space-x-4 mt-2">
          <li>
            <a href="/" className="text-sm text-gray-300 hover:text-white">
              Tasks
            </a>
          </li>
        </ul>
        <a href="https://www.github.com/DioxideHydrogen" target="_blank" className="text-sm text-gray-300 hover:text-white space-x-4">
          About Me
        </a>
			</header>
		</>
	);
}

export default Header