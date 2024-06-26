import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, tokenState } from "../store/atoms/auth";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import logo from '../assets/favicon.png';
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setTokenState = useSetRecoilState(tokenState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const location = useLocation();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTokenState("");
    closeMenu();
    toast.success('Logged out successfully')
  };

  const getNavLinkClass = (path: string) => {
    return location.pathname === path
      ? "block py-2 px-3 bg-blue-600 rounded md:bg-transparent md:p-0 text-white md:text-blue-300"
      : "block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-300 hover:bg-blue-400 hover:text-white md:hover:bg-transparent";
  };

  return (
    <nav className="bg-gradient-to-r from-pink-900 to-sky-600 fixed w-full z-20 top-0 start-0 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/app" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={closeMenu}>
        <img src={logo} className="h-8" alt="Styleshare Logo" />
          <span className="self-center justify-between text-2xl font-bold whitespace-nowrap text-white font-mono">
          {t("navbar.logo")}
          </span>
        </Link>
       <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open Menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto transition-all duration-300 ease-in-out`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 text-lg md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li className="mt-2 md:mb-0">
              <Link to="/app" className={getNavLinkClass("/app")} aria-current="page" onClick={closeMenu}>
              {t("navbar.links.home")}
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/app/posts" className={getNavLinkClass("/app/posts")} onClick={closeMenu}>
              {t("navbar.links.posts")}
              </Link>
            </li>
            <li className="mt-2">
                  <Link to="/app/leaderboard" className={getNavLinkClass("/app/leaderboard")} onClick={closeMenu}>
                  {t("navbar.links.leaderboard")}
                  </Link>
                </li>
            {!isLoggedIn ? (
              <div className="flex flex-col md:flex-row md:space-x-4">
                <li className="mb-2 md:mb-0">
                  <Link
                    to="/app/signin"
                    className="block py-2 px-3 rounded-full text-white bg-gradient-to-l from-blue-400 to-pink-500 duration-300 transition-colors hover:from-pink-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 "
                    onClick={closeMenu}
                  >
                    {t("navbar.links.signin")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app/signup"
                    className="block py-2 px-3 rounded-full text-white bg-gradient-to-l from-blue-400 to-pink-500 duration-300 transition-colors hover:from-pink-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    onClick={closeMenu}
                  >
                    {t("navbar.links.signup")}
                  </Link>
                </li>
              </div>
            ) : (
              <>
                <li className="mt-2">
                  <Link to="/app/new-post" className={getNavLinkClass("/app/new-post")} onClick={closeMenu}>
                  {t("navbar.links.newpost")}
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="/app/code" className={getNavLinkClass("/app/code")} onClick={closeMenu}>
                    {t("code")}
                  </Link>
                </li> 
                <li className="mt-2">
                  <Link to="/app/profile" className={getNavLinkClass("/app/profile")} onClick={closeMenu}>
                  {t("navbar.links.profile")}
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="/app/fav" className={getNavLinkClass("/app/fav")} onClick={closeMenu}>
                  {t("navbar.links.favorite")}
                  </Link>
                </li>
                <li className="mt-2">
                  <button
                    className="block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent w-full text-left"
                    onClick={handleLogout}
                  >
                    {t("navbar.links.logout")}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
