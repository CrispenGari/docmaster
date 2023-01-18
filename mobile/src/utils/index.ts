import { ReactNativeFile } from "apollo-upload-client";

export const generateRNFile = ({
  uri,
  name,
  mimeType,
}: {
  uri: string;
  name: string;
  mimeType: string;
}) => {
  return uri
    ? new ReactNativeFile({
        uri,
        type: mimeType,
        name,
      })
    : null;
};
