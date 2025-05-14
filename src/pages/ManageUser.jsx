
import UserTable from '../components/UserTable'
import 'react-toastify/dist/ReactToastify.css'
import {useAuth} from '../context/AuthContext';

const ManageUser = () => {
const { user, isLogin } = useAuth();

  if (!isLogin || !user) {
    return <Navigate to="/" />;
  }

  console.log(user.username)
  return (
    <div className="w-full min-h-full">
      <div className="container mx-auto p-4">
        <UserTable/>
      </div>
    </div>
  );
};

export default ManageUser;