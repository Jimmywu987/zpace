// Loading Spinner
export default function Loader({ show } : { show: any}) {
  return show ? <div className="loader"></div> : null;
}
