import React from 'react';
import styles from './userDashboard.module.css';
import timeLineImg from "./fypTimelineImage.png"
import Slider from './parallax/slider';
import Taskbar from '../taskbar/taskbar';
import Futtor from '../futtor/futtor';
import NoticeBoard from '../noticeboard/noticeboard';


const UserDashboard = () => {


  return (
    <div className={styles.userdashboardContainer}>

      <Taskbar /> 
        {/* <Navbar /> */}
     <div className={styles.sliderContent}>
        <Slider title="WELCOME TO FYPEDIA" />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.sbfooter}>
        <h1 className={styles.fypcommittee}>FYP Coordination Committee</h1>
          <div className={styles.sbfooterlinks}>
            <div className={styles.sbfooterlinkdiv}>
            
              <h2 className={styles.sbfooterlinkdivh2}>FYP Coordinator:</h2>
                <h3 className={styles.sbfooterlinkdivh3}>Ms. Ayesha ghayas</h3>
                <p className={styles.roomNo}>Room 204, 100 Campus</p>
            </div>

            <div className={styles.sbfooterlinkdiv}>
              <h2 className={styles.sbfooterlinkdivh2}>Program Support Officer:</h2>
                <h3 className={styles.sbfooterlinkdivh3}>Mr. Sarang Ahmed</h3>
                <p className={styles.roomNo}>Room 204, 100 Campus</p>
            </div>

            <div className={styles.sbfooterlinkdiv}>
              <h2 className={styles.sbfooterlinkdivh2}>FYP Support Officers:</h2>
                <h3 className={styles.sbfooterlinkdivh3}>Mr. Mubeen Khan</h3>
                <p className={styles.roomNo}>Project Lab, 154 Campus</p>
            </div>

            <div className={styles.sbfooterlinkdiv}>
              <h2 className={styles.sbfooterlinkdivh2}>Technical Support:</h2>
                <h3 className={styles.sbfooterlinkdivh3}>Mr. Ali Mobin Memon</h3>
                <p className={styles.roomNo}>Room 303-A, 100 campus</p>
            </div>
            
          </div>
        </div>
      </div>

      <div className={styles.announcmentBox}>
        <NoticeBoard />
      </div>

      <div className={styles.fypTimeLine}>
        <img src={timeLineImg} alt="" className={styles.timeLineImg}/>
      </div>
      <Futtor />
    </div>
  );
};

export default UserDashboard;