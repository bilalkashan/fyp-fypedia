import React from "react";
import styles from "./dataSet.module.css";
import Taskbar from "../taskbar/taskbar";
import DatasetCard from "./datasetCard";
import Futtor from "../futtor/futtor";

const Data = [
  
    {
      img: "/assets/openpakdata.png",
      alt: "Open Pakistan Data Logo",
      name: "Open Pakistan Data",
      desc: "Open Data Pakistan is brought to you by the National Center for Big Data and Cloud Computing (NCBC), Lahore University of Management Sciences (LUMS) and Higher Education Commission (HEC).",
      link: "https://opendata.com.pk/"
    },
    {
      img: "/assets/datagov.png",
      alt: "DATA.GOV Logo",
      name: "DATA.GOV",
      desc: "Here you will find data, tools, and resources to conduct research, develop web and mobile applications, design data visualizations, and more.",
      link: "https://data.gov/"
    },
    {
      img: "/assets/datagovuk.png",
      alt: "DATA.GOV.UK Logo",
      name: "DATA.GOV.UK",
      desc: "Find data published by central government, local authorities and public bodies to help you build products and services.",
      link: "https://www.data.gov.uk/"
    },
    {
      img: "/assets/datagovau.png",
      alt: "DATA.GOV.AU Logo",
      name: "DATA.GOV.AU",
      desc: "An easy way to find, explore and reuse Australia's public data.",
      link: "https://data.gov.au/home"
    },
    {
      img: "/assets/kaggle.png",
      alt: "Kaggle Logo",
      name: "Kaggle",
      desc: "Explore, analyze, and share quality data. Learn more about data types, creating, and collaborating.",
      link: "https://data.gov.au/home"
    }
  
  
];

const DataSet = () => {
  const card = Data.map((item, index) => {
    return <DatasetCard key={index} image={item.img} name={item.name} desc={item.desc} link={item.link}/>;
  });

  return (
    <>
    <Taskbar/>
      <h1 className={styles.dataHeading}>DownLoad Free DataSets</h1>
      <div className={styles.wrapper}>{card}</div>
      <div className={styles.datafooter}>
        <Futtor />
      </div>
    </>
  );
};

export default DataSet;
