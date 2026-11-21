// Graphic identity of the Senhor dos Passos experience: a church portal drawn
// with nested arches over a flight of steps. Abstract on purpose — it stands in
// for photography until credited images of the romaria are curated.
export default function PassosArt({ className = '', label }: { className?: string; label?: string }) {
  return <div className={`vs-passos-art ${className}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeLinecap="round">
        {[0, 1, 2, 3, 4].map(step => {
          const radius = 110 - step * 22;
          const apex = 80 + step * 16;
          return <path key={step} d={`M${200 - radius} 238V${apex + radius}a${radius} ${radius} 0 0 1 ${radius * 2} 0V238`} strokeWidth={step === 0 ? 3 : 1.6} opacity={1 - step * 0.16} />;
        })}
        <path d="M200 30v40M186 44h28" strokeWidth="3" />
      </g>
      <g fill="currentColor">
        {[0, 1, 2, 3, 4, 5, 6].map(step => <rect key={step} x={70 - step * 12} y={238 + step * 9} width={260 + step * 24} height="5" rx="1" opacity={0.9 - step * 0.1} />)}
      </g>
    </svg>
  </div>;
}
