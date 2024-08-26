import styles from "./home.module.scss";
const HomeLoading = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default HomeLoading;
