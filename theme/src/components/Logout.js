import { useNavigate } from 'react-router-dom';
import { removeUserSession } from '../utils/Common';

export default function Logout() {
  const navigate = useNavigate();
  removeUserSession('user_token'); removeUserSession('user_info');
  navigate('/', { replace: true });
}
