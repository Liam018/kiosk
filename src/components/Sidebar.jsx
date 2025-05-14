// components/Sidebar.jsx
import { NavLink } from 'react-router';
import logo from '../assets/logo.png';
import { Users, Megaphone, Map, MessageSquare, LayoutDashboard, FileCog} from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Manage User', path: '/users', icon: Users },
    { id: 'announcements', label: 'Manage Announcement', path: '/announcements', icon: Megaphone },
    { id: 'map', label: 'View Campus Map', path: '/map', icon: Map },
    { id: 'feedback', label: 'Manage Feedback', path: '/feedback', icon: MessageSquare },
    { id: 'report ', label: 'Generate Report', path: '/report', icon: FileCog },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-screen">
      {/* Logo */}
      <div className="flex p-4 shadow justify-center items-center gap-1">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <div className='flex-col justify-center'>
           <span className='text-lg text-center font-bold'>CZCMNHS</span><br />
           <span className='text-xs font-semibold text-'>INTERACTIVE KIOSK</span>
        </div>
       
      </div>

      {/* Navigation */}
      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `w-full text-left font-bold px-6 py-5 flex items-center space-x-3 ${
                isActive ? 'bg-teal-700  text-white shadow-2xs' : 'text-teal-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className='w-6 h-6' />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
    </div>
  );
};

export default Sidebar;