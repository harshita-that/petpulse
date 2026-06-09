export default function PawIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main pad */}
      <ellipse cx="50" cy="65" rx="22" ry="18" />
      {/* Top-left toe */}
      <ellipse cx="25" cy="38" rx="12" ry="14" />
      {/* Top-right toe */}
      <ellipse cx="75" cy="38" rx="12" ry="14" />
      {/* Middle toe */}
      <ellipse cx="50" cy="28" rx="11" ry="13" />
    </svg>
  );
}
