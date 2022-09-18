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

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col w-[25%]">
        <div className="text-center">No. of Space available: 0</div>
        <div className="">
          {/* @TODO  room rendering*/}
          <div ref={ref}></div>
        </div>
      </div>
      <div className="flex flex-col w-[75%]">
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
