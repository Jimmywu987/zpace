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
        className="object-contain w-60 h-60"
        alt="preview-pic"
      />
    </div>
  );
};
