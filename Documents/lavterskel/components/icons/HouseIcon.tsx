export default function HouseIcon({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        {/* Her ligger de faktiske strekene til ikonet */}
        <path d="M16 2L2 14v16h28V14L16 2z" /> 
      </svg>
    );
  }