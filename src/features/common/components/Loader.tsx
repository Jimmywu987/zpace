// Loading Spinner
export default function Loader({ show = true }: { show?: boolean }) {
  return show ? <div className="loader" /> : null;
}
