import logo from '../../public/logo.png'

export default function Navbar() {
    return (
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-6 border-b-3 border-gray-200 z-50">
        {/* <img src={logo} alt="logo" className="h-9" /> */}
        <p className='text-blue-500 font-extrabold text-2xl italic'>Chit~Chat</p>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
            CL
          </div>
        </div>
      </nav>
    );
  }