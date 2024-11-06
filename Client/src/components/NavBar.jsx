import { NavLink } from "react-router-dom";
import {
  BiLogIn,
  BiLogOut,
  BiHome,
  BiMapPin,
  BiSolidDashboard,
  BiSolidUserCircle,
  BiMoon,
  BiSolidSun,
  BiUser,
  BiReply,
  BiComment,
} from "react-icons/bi";
import Logo from "./Logo";
import styles from "./NavBar.module.css";
import NavOptions from "./NavOptions";
import { useDispatch, useSelector } from "react-redux";
import { darkModeToogle } from "../slices/settingSlice";
function NavBar() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  //   console.log("the settinsg are as follows ", settings);
  return (
    <div className={styles.navbar}>
      <Logo />
      <NavOptions>
        {/* <NavLink className={styles.navItem} to="/">
          <BiHome className={styles.icon} />
          <span>Home</span>
        </NavLink> */}
        <NavLink className={styles.navItem} to="/travel/search">
          <BiMapPin className={styles.icon} />
          <span>Explore</span>
        </NavLink>
        {isLoggedIn ? (
          <NavLink className={styles.navItem} to="/dashboard/popular">
            <BiSolidDashboard className={styles.icon} />
            <span>Dashboard</span>
          </NavLink>
        ) : null}
        {isLoggedIn ? (
          <NavLink className={styles.navItem} to="/me">
            <BiUser className={styles.icon} />
            <span>{username}</span>
          </NavLink>
        ) : (
          <NavLink className={styles.navItem} to="/login">
            <BiLogIn className={styles.icon} />
            <span>Login</span>
          </NavLink>
        )}
      </NavOptions>
    </div>
  );
}

export default NavBar;
