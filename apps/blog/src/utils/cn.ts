type CnArg = string | string[] | undefined | null | boolean;

export function cn(...classNames: CnArg[]) {
  return classNames
    .flatMap((c) => (Array.isArray(c) ? c : [c]))
    .filter(Boolean)
    .join(' ');
}
