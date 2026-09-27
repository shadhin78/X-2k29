/**
 * X-29 Advance: Color & Palette Mapping Utilities
 */

export const SUBJECT_PALETTE_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e',
  '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
  '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
];

export function hashStringToColor(str: string, palette: string[] = SUBJECT_PALETTE_COLORS): string {
  if (!str) return '#3b82f6';
  const pal = Array.isArray(palette) && palette.length > 0 ? palette : SUBJECT_PALETTE_COLORS;
  let hash = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }
  return pal[Math.abs(hash) % pal.length];
}

export function getSubjectColor(subjName?: string | null, palette: string[] = SUBJECT_PALETTE_COLORS): string {
  if (!subjName) return '#3b82f6';
  return hashStringToColor(subjName, palette);
}

export function hexToRgba(hex: string | null | undefined, alpha: number = 1): string {
  if (!hex || typeof hex !== 'string') return `rgba(16, 185, 129, ${alpha})`;
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((char) => char + char).join('');
  }
  if (cleanHex.length !== 6) return `rgba(16, 185, 129, ${alpha})`;

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(16, 185, 129, ${alpha})`;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
