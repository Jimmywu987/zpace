import { useEffect, useState } from "react";

export const RenderPreview = ({ render }: { render: File }) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(render);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [render.name]);
  return (
    <div>
      <img
        src={preview}
        className="object-contain w-full md:w-60 md:h-60"
        alt="preview-pic"
      />
    </div>
  );
};
