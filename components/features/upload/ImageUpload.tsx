import BaseButton from "@/components/shared/BaseButton";
import Button from "@/components/shared/Button";
import FileUploading, {FileUploader, FileUploadingProps} from "@/components/shared/FileUploading";
import Image from "@/components/shared/Image";
import { randomString } from "@/utils";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {RiImageAddLine } from "react-icons/ri"


interface ImageUploadProps extends FileUploadingProps {
  onChange?: (images: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, ...props }) => {
  const handleFileChange = (fileList: File[]) => {
    onChange?.(fileList);
  };

  return (
    <FileUploading
      onChange={handleFileChange}
      multiple
      {...props}
    >
      {(props) => {
        if (!props.fileList?.length) return <FileUploader {...props} />;

        return (
          <div className="flex flex-wrap bg-background-100 items-center gap-2">
            {props.fileList.map((file, index) => {
              const key = randomString(8);

              const imageSrc = URL.createObjectURL(file);

              return (
                <div key={key} className="relative col-span-1">
                  <div className="w-28 h-28 md:w-[130px]">
                    <Image
                      src={imageSrc}
                      alt={file.name}
                      layout="fill"
                      objectFit="cover"
                      unoptimized
                    />
                  </div>

                  <div className="bg-transparent absolute top-0 right-0 flex items-center">
                    <Button
                      secondary
                      onClick={() => props.onFileUpdate(index)}
                      LeftIcon={AiOutlineEdit}
                      iconClassName="w-4 h-4 text-gray-400"
                      className="!p-1"
                    />

                    <Button
                      secondary
                      onClick={() => props.onFileRemove(index)}
                      LeftIcon={AiOutlineDelete}
                      iconClassName="text-red-500 w-4 h-4"
                      className="!p-1"
                    />
                  </div>
                </div>
              );
            })}

            <BaseButton
              LeftIcon={RiImageAddLine}
              onClick={props.onFileUpload}
              className="transition-none relative w-28 h-28 md:w-[130px] col-span-1 border border-dashed border-gray-300 hover:bg-gray-50"
              iconClassName="fill-gray-300 w-8 h-8 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            />
          </div>
        );
      }}
    </FileUploading>
  );
};

export default ImageUpload;
