type IndianFlagProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function IndianFlag({
  width = 300,
  height = 200,
  className,
}: IndianFlagProps) {
  return (
    <img
      src="/india-flag.svg"
      alt="Flag of India"
      width={width}
      height={height}
      className={className}
    />
  );
}
