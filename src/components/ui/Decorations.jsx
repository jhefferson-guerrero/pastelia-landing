// Manchas orgánicas decorativas de fondo
export function OrganicBlob({ className }) {
  return (
    <div
      className={`absolute pointer-events-none mix-blend-multiply opacity-40 ${className}`}
      style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
    ></div>
  );
}
