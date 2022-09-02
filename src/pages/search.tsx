import { AdvancedSearchModal } from "@/features/searchMap/components/modal/AdvancedSearchModal";
import { useState } from "react";

export default function SearchResultPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>{/* @TODO  left side rooms rendering */}</div>
      <div>{/* @TODO  right side for map*/}</div>
      <AdvancedSearchModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
