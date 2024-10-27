import { useState } from "react";
/* import settings from "../assets/settings.svg"
import overview from "../assets/overview.svg"
import human from "../assets/human.svg"
import finance from "../assets/finance.svg"
import placements from "../assets/placements.svg"
import projects from "../assets/projects.svg"*/
import arrow from "../assets/arrow.svg";
import dashicon from "../assets/dashicon.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
/* import user from "../assets/user.svg"
import research from "../assets/research.svg"
import report from "../assets/report.svg"
import feedback from "../assets/feedback.svg" */

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { role } = useSelector((state) => state.auth);
  const overviewsvg = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    );
  };
  let Menus;
  {
    role === "user"
      ? (Menus = [
          // { title: "Overview", src: "Overview", svg: overview  , href: 'overview'},
          { title: "Invest", src: "Overview", svg: "user", href: "invest" },
          { title: "Loan", src: "HumanResource", svg: "human", href: "loan" },
          { title: "Payment", src: "Finance", svg: "finance", href: "payment" },
          /*{ title: "Placements", src: "Placements", svg: placements , href: 'placements'},
    { title: "Strategic Projects", src: "StrategicProjects", svg: projects , href: 'strategic-projects'},
    { title: "Research", src: "Research", svg: research , href: 'research'},
    { title: "Report Generation", src: "Research", svg: report , href: 'research'},
    { title: "Feedback", src: "Feedback", svg: feedback , href: 'feedBack'}, */
        ])
      : (Menus = [
          // { title: "Overview", src: "Overview", svg: overview  , href: 'overview'},
          {
            title: "KYC_Request",
            src: "Overview",
            svg: "user",
            href: "/admin/kycRequest",
          },
          {
            title: "Loan_Request",
            src: "HumanResource",
            svg: "human",
            href: "/admin/loanRequest",
          },
          {
            title: "Active_Users",
            src: "HumanResource",
            svg: "human",
            href: "/admin/ActiveUsers",
          },
          {
            title: "Kyc_Details",
            src: "HumanResource",
            svg: "human",
            href: "/admin/KycDetails",
          },
          //{ title: "Payment", src: "Finance", svg: "finance" , href: 'payment'},
          /*{ title: "Placements", src: "Placements", svg: placements , href: 'placements'},
    { title: "Strategic Projects", src: "StrategicProjects", svg: projects , href: 'strategic-projects'},
    { title: "Research", src: "Research", svg: research , href: 'research'},
    { title: "Report Generation", src: "Research", svg: report , href: 'research'},
    { title: "Feedback", src: "Feedback", svg: feedback , href: 'feedBack'}, */
        ]);
  }

  const navigate = useNavigate();
  return (
    <div className=" flex  md:block hidden">
      <div
        className={` ${
          open ? "w-60" : "w-15 "
        } bg-gray-600 h-screen p-5 pt-8 relative transition-all duration-200 ease-in-out`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <img
          src={arrow}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple bg-white  p-1  shadow-lg
 border-2 rounded-lg  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center w-10">
          <img
            src={dashicon}
            /* className={`cursor-pointer duration-500 ${open && "rotate-[360deg] hover:scale-110 hover:rotate-[180deg]"
              }`} */
          />
          <h1
            className={`text-white cursor-pointer hover:text-2xl origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
            onClick={() => {
              navigate("/branch");
            }}
          >
            Dashboard
          </h1>
        </div>
        <ul className=" pt-6">
          {Menus.map((Menu, index) => (
            <a href={Menu.href}>
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-white hover:scale-105 text-gray-300 text-sm items-center gap-x-4  ${
                  Menu.gap ? " mt-9" : " mt-2"
                } ${index === 0 && "bg - light - white"} `}
              >
                <img src={Menu.svg} className="w-6" />
                <span
                  className={`${!open && "hidden"} origin-left font-medium `}
                >
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
