import React from 'react';
import styles from './DetailsCSS.module.css';
import DetailsDashboardList from './DetailsDashboardList';
import {
  getStudentProgressInSuperblock,
  extractStudentCompletionTimestamps
} from '../util/api_proccesor';
import StudentActivityChart from './StudentActivityChart';

export default function DetailsDashboard(props) {
  const printSuperblockTitle = individualSuperblockJSON => {
    let indexOfTitleInSuperblockTitlesArray =
      props.superblocksDetailsJSONArray.indexOf(individualSuperblockJSON);
    let superblockTitle =
      props.superblockTitles[indexOfTitleInSuperblockTitlesArray];
    return superblockTitle;
  };

  const superblockProgress = superblockDashedName => {
    let studentProgress = props.studentData;

    return getStudentProgressInSuperblock(
      studentProgress,
      superblockDashedName
    );
  };

  const completionTimestamps = extractStudentCompletionTimestamps(
    props.studentData.certifications
  );

  return (
    <>
      <StudentActivityChart timestamps={completionTimestamps} />
      {props.superblocksDetailsJSONArray.map((arrayOfBlockObjs, idx) => {
        let index = props.superblocksDetailsJSONArray.indexOf(arrayOfBlockObjs);
        let superblockDashedName =
          props.superblocksDetailsJSONArray[index][0].superblock;
        let progressInBlocks = superblockProgress(superblockDashedName);
        let superblockTitle = printSuperblockTitle(arrayOfBlockObjs);
        return (
          <div key={idx} className={styles.board_container}>
            <DetailsDashboardList
              superblockTitle={superblockTitle}
              studentProgressInBlocks={progressInBlocks}
              blockData={arrayOfBlockObjs}
            />
          </div>
        );
      })}
    </>
  );
}
