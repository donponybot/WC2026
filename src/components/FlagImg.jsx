import { flagUrl } from '../utils/flags';

// Renders a flag image from flagcdn.com
// size = height in px (width auto-calculated at 4:3 ratio)
export default function FlagImg({ team, size = 22, style = {} }) {
  const url = flagUrl(team, size * 2); // 2x for retina
  if (!url) return null;

  return (
    <img
      src={url}
      alt={team}
      width={Math.round(size * 1.33)}
      height={size}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        borderRadius: 2,
        objectFit: 'cover',
        flexShrink: 0,
        ...style,
      }}
      loading="lazy"
    />
  );
}
