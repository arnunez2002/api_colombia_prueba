import { FiPlus,FiUsers } from "react-icons/fi";
import { AiOutlineRead,AiOutlineDashboard,AiTwotoneShop,AiOutlineSetting,AiFillCalendar } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { FaPlane , FaMapMarkedAlt} from "react-icons/fa";

const menus = [
  {
    link: "API Colombia",
    path: "/",
    icon: "AN",
    className: "menu logo",
  },
  {
    link: "Presidents",
    path: "/presidentes",
    icon: <AiOutlineTeam />,
    className: "menu",
  },
  {
    link: "Vuelos",
    path: "/vuelos",
    icon: <FaPlane />,
    className: "menu",
  },
  
  {
    link: "Turismo",
    path: "/tursimo",
    icon: <FaMapMarkedAlt />,
    className: "menu",
  },
  
];

export default menus;
