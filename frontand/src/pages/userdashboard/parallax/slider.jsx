import styles from "./parallax.module.css";
import Woman from "./background.jpg";
import { Parallax } from "react-parallax";

const Slider = (props) => {

  return (
    <>
    <div className="App">
      <Parallax className={styles.parallax} strength={100} bgImage={Woman}>
        <div className={styles.sliderContent}>
          <div className={styles.textContent}>{props.title}</div>
        </div>
      </Parallax>

      <div className={styles.sliderContent}></div>
    </div>
    </>
  );
};

export default Slider;