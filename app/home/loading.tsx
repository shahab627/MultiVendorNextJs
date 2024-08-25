import styles from "./home.module.scss";
const HomeLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className={styles.spinner}></div>
    </div>
  );
};

export default HomeLoading;
