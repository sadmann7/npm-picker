import styles from "@/styles/loading-dots.module.css";

const LoadingDots = ({
  color = "#f9fafb",
  size = "large",
}: {
  color: string;
  size: "small" | "large";
}) => {
  return (
    <span className={size === "small" ? styles.small : styles.large}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
