import { AdvancedSearchModal } from "@/features/searchMap/components/modal/AdvancedSearchModal";
import { Map } from "@/features/searchMap/components/Map";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
export default function SearchResultPage() {
  const [open, setOpen] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  console.log("inView", inView);
  console.log("entry", entry);
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <div>No. of Space available: 0</div>
        <div className="">
          {/* @TODO  room rendering*/}
          <div ref={ref}></div>
        </div>
      </div>
      <div className="flex flex-col w-[70%]">
        <Map />
      </div>
      <AdvancedSearchModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
