
const LoadingBar = () => {
  return (
    <div style={{
      width: '100%',
      height: '7px',
      background: `
        linear-gradient(
          270deg,
          #fef19b,
          #be54b0,
          #8f9cce,
          #61e9e6,
          #b4d66c,
          #fbc503,
          #fef19b,
          #be54b0,
          #8f9cce,
          #61e9e6,
          #b4d66c,
          #fbc503,
          #fef19b
        )
      `,
      backgroundSize: '900% 100%',
      backgroundRepeat: 'repeat-x',
      animation: 'moveGradient 4s linear infinite',
    }}>
      {/* Optional content here */}
      <style>{`
        @keyframes moveGradient {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: 0% 0;
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingBar
