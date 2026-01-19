export default function Moon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="#000000"
      style={{
        width: '20px',
        height: '20px',
        animation: 'fadeIn 0.2s ease-in forwards',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      <title>Moon Icon</title>
      <path
        suppressHydrationWarning
        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
      />
    </svg>
  );
}
