import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";
import { Platform } from "react-native";

const PROFILE_IMAGE_BUCKET = "profile-images";

function isCloudImage(uri: string | null) {
  return Boolean(
    uri && (uri.startsWith("https://") || uri.startsWith("http://")),
  );
}

function getFileExtension(uri: string) {
  const cleanUri = uri.split("?")[0].toLowerCase();

  if (cleanUri.endsWith(".png")) {
    return "png";
  }

  if (cleanUri.endsWith(".webp")) {
    return "webp";
  }

  return "jpg";
}

function getContentType(extension: string) {
  switch (extension) {
    case "png":
      return "image/png";

    case "webp":
      return "image/webp";

    default:
      return "image/jpeg";
  }
}

function getStoragePathFromPublicUrl(publicUrl: string) {
  const marker = `/object/public/${PROFILE_IMAGE_BUCKET}/`;
  const markerIndex = publicUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  const encodedPath = publicUrl.slice(markerIndex + marker.length);

  try {
    return decodeURIComponent(encodedPath.split("?")[0]);
  } catch {
    return encodedPath.split("?")[0];
  }
}

async function convertImageToArrayBuffer(uri: string) {
  if (Platform.OS === "web") {
    const response = await fetch(uri);

    if (!response.ok) {
      throw new Error("Unable to read the selected profile image.");
    }

    return response.arrayBuffer();
  }

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return decode(base64);
}

export async function uploadProfileImage({
  userId,
  imageUri,
  previousImageUrl,
}: {
  userId: string;
  imageUri: string;
  previousImageUrl: string | null;
}) {
  if (isCloudImage(imageUri)) {
    return imageUri;
  }

  const extension = getFileExtension(imageUri);
  const contentType = getContentType(extension);
  const filePath = `${userId}/avatar-${Date.now()}.${extension}`;
  const imageData = await convertImageToArrayBuffer(imageUri);

  const { error: uploadError } = await supabase.storage
    .from(PROFILE_IMAGE_BUCKET)
    .upload(filePath, imageData, {
      contentType,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage
    .from(PROFILE_IMAGE_BUCKET)
    .getPublicUrl(filePath);

  const publicUrl = data.publicUrl;

  if (previousImageUrl && isCloudImage(previousImageUrl)) {
    const previousPath = getStoragePathFromPublicUrl(previousImageUrl);

    if (previousPath && previousPath !== filePath) {
      const { error: removeError } = await supabase.storage
        .from(PROFILE_IMAGE_BUCKET)
        .remove([previousPath]);

      if (removeError) {
        console.warn(
          "New profile image uploaded, but the old image could not be removed:",
          removeError.message,
        );
      }
    }
  }

  return publicUrl;
}

export async function removeProfileImage(imageUrl: string | null) {
  if (!imageUrl || !isCloudImage(imageUrl)) {
    return;
  }

  const filePath = getStoragePathFromPublicUrl(imageUrl);

  if (!filePath) {
    return;
  }

  const { error } = await supabase.storage
    .from(PROFILE_IMAGE_BUCKET)
    .remove([filePath]);

  if (error) {
    throw new Error(error.message);
  }
}
