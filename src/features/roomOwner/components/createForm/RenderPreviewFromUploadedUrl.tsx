import { RoomImg } from "@prisma/client";

export const RenderPreviewFromUploadedUrl = ({
  render,
}: {
  render: RoomImg;
}) => {
  return (
    <div>
      <img
        src={render.url}
        className="object-contain w-full md:w-60 md:h-60"
        alt="preview-pic"
      />
    </div>
  );
};
