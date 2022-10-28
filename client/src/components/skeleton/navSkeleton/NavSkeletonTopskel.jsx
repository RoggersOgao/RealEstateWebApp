import { useEffect, useState, useContext, useRef } from "react";
import "./navSkeletonskel.scss"
import LoginContext from "../../context/auth/loginContext/LoginContext";
import { Link } from "react-router-dom";
function NavSkeletonTopskel() {
  const { state } = useContext(LoginContext);

  let user = false;
  if (state.user === null) {
    user = false;
  } else {
    user = true;
  }

  const [offsetY, setOffsetY] = useState(0);


  const profileRef = useRef();

  const handleScroll = () => setOffsetY(window.pageYOffset);

  let color = false;
  if (offsetY >= 100) {
    color = true;
  } else {
    color = false;
  }

  useEffect(() => {

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className="navskel">
      <div className={color ? "top activeTop" : "top"}>
        <div className="top__left">
          <div className="top__left--ISTextIcon">
            <div className="top__left--ISTextIcon--icon">
            </div>
            <div className="top__left--ISTextIcon--text">
            </div>
          </div>
          <div className="top__left--ISTextIcon">
            <div className="top__left--ISTextIcon--icon">
            </div>
            <div className="top__left--ISTextIcon--text"></div>
          </div>
        </div>
        <div className="top__right">
          <div className="top__right--ISTextIcon">
            <div className="top__right--ISTextIcon--icon">
            </div>
            <div className="top__right--ISTextIcon--text"></div>
          </div>
          {user ? (
            <div ref={profileRef}>
              <div
                className="profileContainer"
              >
                {state.user.profile ? (
                  <img src="" alt="" />
                ) : (
                  <div
                    className="profileAnottation"
                  >
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="top__right--ISTextIcon">
              <div className="top__right--ISTextIcon--icon">
                <img
                  src={process.env.PUBLIC_URL + "/icons/signIn.png"}
                  alt=""
                  className="iconSignIn"
                />
              </div>
              <div className="top__right--ISTextIcon--textSignIn">
                <Link to="/login" className="link">
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavSkeletonTopskel;
