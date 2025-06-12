import contacts from '../data/contacts';

export default function Sidebar({ selectedId, onSelect, collapsed, setCollapsed, isMobileView}) {
  return (
    <aside className={`fixed top-16 left-0 bottom-0 bg-white border-r-4 border-gray-300 transition-all duration-300 z-10
      ${isMobileView ? 'w-full' : collapsed?'w-20' : 'w-80'}  flex flex-col` }>
      <div className="flex items-center justify-between p-5 font-bold text-lg">
        <span className={`${collapsed ? 'hidden' : 'block'} `}>Chats</span>
        <button
          className="text-xl hidden md:block"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {contacts.map((c) => (
          <li
            key={c.id}
            className={`flex items-center p-3 cursor-pointer hover:bg-indigo-50
              ${selectedId === c.id ? 'bg-indigo-100 border-l-4 border-indigo-500' : ''}`}
            onClick={() => onSelect(c.id)}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3"
              style={{ background: c.bg }}>
              {c.avatar}
            </div>
            <div className={`flex-1 ${collapsed ? 'hidden' : 'block'}`}>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-500 truncate">{c.lastMsg}</div>
            </div>
            <div className={`text-xs text-gray-400 ml-2 ${collapsed ? 'hidden' : 'block'} `}>{c.time}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}