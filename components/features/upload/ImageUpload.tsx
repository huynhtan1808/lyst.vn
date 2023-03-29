import BaseButton from "@/components/shared/BaseButton";
import Button from "@/components/shared/Button";
import FileUploading, {FileUploader, FileUploadingProps} from "@/components/shared/FileUploading";
import Image from "@/components/shared/Image";
import { randomString } from "@/utils";
import { AiFillFileAdd, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

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
          <div className="flex bg-background-100 items-center gap-4">
            {props.fileList.map((file, index) => {
              const key = randomString(8);

              const imageSrc = URL.createObjectURL(file);

              return (
                <div key={key} className="relative col-span-1">
                  <div className="w-28 h-28">
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
                      iconClassName="w-4 h-4 text-gray-600"
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
              LeftIcon={AiFillFileAdd}
              onClick={props.onFileUpload}
              className="relative w-10 h-14 col-span-1 border border-dashed border-gray-300 hover:border-white bg-transparent"
              iconClassName="w-10 h-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            />
          </div>
        );
      }}
    </FileUploading>
  );
};

export default ImageUpload;
