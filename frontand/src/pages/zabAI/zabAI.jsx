import React from "react";
import styles from "./zabAI.module.css";
import { Link } from "react-router-dom";
import addBtn from "./assets/add-30.png";
import home from "./assets/home.png"
import sendBtn from "./assets/send.svg"
import userIcon from "./assets/user-icon.png"
import gptLogo from "./assets/chatgptLogo.png"

function ZabAI() {
  return (
    <div className={styles.zabAiApp}>
      <div className={styles.sidebarContent}>
        <div className={styles.uppersideContent}>
          <div className={styles.upperSideTop}>
            <img
              src="/images/szabist-logo.png"
              alt=""
              className={styles.ZabLogo}
            />
            <span className={styles.AppName}>ZABAI</span>
          </div>
          <button className={styles.plusBtn}>
            <img src={addBtn} alt="" className={styles.addBtn} />
            New Chat
          </button>
          <div className={styles.uppersideBottom}>
            <button className={styles.query}>
              <img src="" alt="" />
              What is FYPEDIA
            </button>
            <button className={styles.query}>
              <img src="" alt="" />
              What is FYPEDIA
            </button>
          </div>
        </div>
        <div className={styles.lowersideContent}>
          <div className={styles.listItems}>
            <Link to="/userdashboard" className={styles.link}>
              <button className={styles.homeBtn}>
                <img src={home} alt="" className={styles.addBtn} />
                Home
              </button>        
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.chats}>
          <div className={styles.chat}>
            <img className={styles.iconImg} src={userIcon} alt="" /><p className={styles.txt}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sapiente similique laudantium maxime est iure illo laboriosam rerum quae quas!</p>
          </div>

          <div className={styles.chatBot}>
            <img className={styles.iconImg} src={gptLogo} alt="" /><p className={styles.txt}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sapiente similique laudantium maxime est iure illo laboriosam rerum quae quas!</p>
          </div>
        </div>
        <div className={styles.chatFooter}>
          <div className={styles.inp}>
            <input type={styles.text} placeholder="Enter a text...."/> <button className={styles.send}><img src={sendBtn} alt="Send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZabAI;