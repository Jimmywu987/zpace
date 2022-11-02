// Loading Spinner
export function Loader({ show = true }: { show?: boolean }) {
  return show ? <div className="loader" /> : null;
}
