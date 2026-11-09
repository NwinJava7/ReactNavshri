type LivingEyeProps = {
  delayMs?: number;
};

export function LivingEye({ delayMs = 0 }: LivingEyeProps) {
  return (
    <span className="living-eye" style={{ animationDelay: `${delayMs}ms` }} aria-hidden>
      <span className="living-eye__white">
        <span className="living-eye__iris">
          <span className="living-eye__pupil" />
          <span className="living-eye__glint" />
        </span>
      </span>
      <span className="living-eye__lid living-eye__lid--top" />
      <span className="living-eye__lid living-eye__lid--bottom" />
    </span>
  );
}
