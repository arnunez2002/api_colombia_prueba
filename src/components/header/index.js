import { MdNotificationsNone } from "react-icons/md";
import { BiBone } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

// import PresidentsList from '.../pages/company/index.js';
const Index = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="header_wrapper">
      <div className="header_content">
        <div className="search_box">
          {/* <form onSubmit={handleSubmit}>
            <div className="form">
              <input
                type="text"
                name="search"
                placeholder="Search for anything..."
                className="search"
                autoComplete="off"
              />
              <span>
                <FiSearch />
              </span>
            </div>
          </form> */}
        </div>
        <div className="profile">
          <li className="report">
            <strong>
              <BiBone />
            </strong>
            <span>8199</span>
          </li>
          <li>
            <strong>
              <MdNotificationsNone />
            </strong>
            <span>109</span>
          </li>
          <li>
            <div className="profile_pic">
              <img
                src="https://res.cloudinary.com/dcwt59fom/image/upload/v1723010915/profafolio/c7mcs6zw9hwscskgygoh.png"
                alt=""
                onClick={() => handleShow(!show)}
              />
              <div
                className="profile_dropdown"
                style={{ display: `${show ? "block" : "none"}` }}
              >
                <ul>
                  <li className="drop_image">
                    <div className="img">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS979zr3oEyc5o5Af0RZ-dmcqPUiJ_UMhp4A&usqp=CAU"
                        alt=""
                      />
                      <div className="content">
                        <h4>Kamal EI Manssouri</h4>
                        <p>Buyer Admin</p>
                      </div>
                    </div>
                  </li>
                  <li>Edit Profile</li>
                  <li>Log out</li>
                </ul>
              </div>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Index;
