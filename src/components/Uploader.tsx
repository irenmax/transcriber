import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FC } from "react";

const { Dragger } = Upload;

type UploaderProps = {
  onChange: (file: File | null) => void;
};

const Uploader: FC<UploaderProps> = ({ onChange }) => (
  <Dragger
    name="file"
    beforeUpload={() => false}
    onChange={(info) => {
      onChange(info.fileList[0]?.originFileObj || null);
    }}
    maxCount={1}
    accept=".m4a, .mp3, .wav"
  >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Dragger>
);

export default Uploader;
