import { useState } from "react";
import arrow from "../assets/arrow.svg";
import dashicon from "../assets/dashicon.svg"; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { role } = useSelector((state) => state.auth);

  let Menus;
  if (role === "user") {
    Menus = [
      { title: "Invest", svg: "https://img.icons8.com/?size=100&id=82688&format=png&color=FFFFFF", href: "invest" },
      { title: "Loan", svg: "https://img.icons8.com/?size=100&id=9bwh9eISXZAz&format=png&color=FFFFFF", href: "loan" },
     // { title: "Payment", svg: "https://img.icons8.com/?size=100&id=78231&format=png&color=FFFFFF", href: "payment" },
      { title: "Loan Request", svg: "https://img.icons8.com/?size=100&id=yAYeAE5xvjeu&format=png&color=FFFFFF", href: "loanRequest" },
      { title: "Loan Negotiate", svg: "https://img.icons8.com/?size=100&id=irl0UrqGW2li&format=png&color=FFFFFF", href: "negotiate" },
    ];
  } else {
    Menus = [
      { title: "KYC Request", svg: "https://img.icons8.com/?size=100&id=7857&format=png&color=FFFFFF", href: "/admin/kycRequest" },
      { title: "KYC Details", svg: "https://img.icons8.com/?size=100&id=33843&format=png&color=FFFFFF", href: "/admin/KycDetails" },
      { title: "Active Users", svg: "https://img.icons8.com/?size=100&id=33843&format=png&color=FFFFFF", href: "/admin/activeUsers" },
    ];
  }

  const navigate = useNavigate();
  return (
    <div className="flex md:block hidden">
      <div
        className={` ${open ? "w-60" : "w-15"} bg-gray-600 h-screen p-5 pt-8 relative transition-all duration-200 ease-in-out`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <img
          src={arrow}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple bg-white p-1 shadow-lg border-2 rounded-lg ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center w-10">
          <img src={dashicon} />
          <h1
            className={`text-white cursor-pointer hover:text-2xl origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
            onClick={() => {role ==='user' ? navigate('/admin/menu'):navigate('/menu') }}
          >
            Dashboard
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <a href={Menu.href} key={index}>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-white hover:scale-105 text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
              >
                <img src={Menu.svg} className="w-8 h-8" alt={`${Menu.title} icon`} /> 
                <span className={`${!open && "hidden"} origin-left font-medium`}>
                  {Menu.title}
                </span>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
