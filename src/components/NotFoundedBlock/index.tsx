import React from 'react';
import styles from './NotFoundedBlock.module.scss';

const NotFoundedBlock: React.FC = () => {
  return (
    <div className={styles.notFoundedBlock}>
        <h1>Ничего не найдено</h1>
    </div>
  )
};

export default NotFoundedBlock; 
