import { BotIcon } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

type UploadedPicturePreviewProps = {
  uploadedPicture?: File;
};

export function UploadedPicturePreview({
  uploadedPicture,
}: UploadedPicturePreviewProps) {
  const imgSrc = useMemo(
    () => (uploadedPicture ? URL.createObjectURL(uploadedPicture) : ""),
    [uploadedPicture],
  );

  return (
    <div className="self-stretch pb-2">
      <div className="relative mx-auto aspect-square w-[200px] overflow-hidden">
        {uploadedPicture ? (
          <Image
            src={imgSrc}
            alt="Uploaded picture"
            fill
            sizes={`200px`}
            className="inline rounded-full object-cover"
          />
        ) : (
          <BotIcon size={200} className="opacity-10" />
        )}
      </div>
    </div>
  );
}
