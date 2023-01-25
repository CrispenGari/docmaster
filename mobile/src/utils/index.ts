import { ReactNativeFile } from "apollo-upload-client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_ID_KEY } from "../constants";

export const setSessionId = async (sid: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(SESSION_ID_KEY, sid);
    return true;
  } catch (error: any) {
    return false;
  }
};

export const getSessionId = async (): Promise<string | null> => {
  try {
    const sid = await AsyncStorage.getItem(SESSION_ID_KEY);
    return sid;
  } catch (error: any) {
    return null;
  }
};

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
