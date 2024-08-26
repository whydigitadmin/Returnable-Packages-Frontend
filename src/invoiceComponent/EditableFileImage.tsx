import { Image } from "@react-pdf/renderer";
import React, { FC, useEffect, useState } from "react";
import compose from "../styles/compose.ts";

interface Props {
  className?: string;
  placeholder?: string;
  value?: string | Blob;
  width?: number;
  pdfMode?: boolean;
}

const EditableFileImage: FC<Props> = ({
  className,
  placeholder,
  value,
  width,
  pdfMode,
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof value === "string") {
      if (value.startsWith("data:image")) {
        // If it's a base64 encoded image
        setImageSrc(value);
      } else if (value.startsWith("iVBORw0KGgo")) {
        // If it's a base64 blob data
        const byteString = atob(value);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } else {
        // If it's a URL
        setImageSrc(value);
      }
    } else if (value instanceof Blob) {
      const url = URL.createObjectURL(value);
      setImageSrc(url);

      // Clean up the URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [value]);

  if (pdfMode) {
    if (imageSrc) {
      return (
        <Image
          style={{
            ...compose(`image ${className ? className : ""}`),
            maxWidth: width,
          }}
          src={imageSrc}
        />
      );
    } else {
      return <></>;
    }
  }

  return (
    <div className={`image ${className ? className : ""}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          className="image__img"
          alt={placeholder}
          style={{ maxWidth: width || 100 }}
        />
      ) : (
        <p>{placeholder}</p>
      )}
    </div>
  );
};

export default EditableFileImage;
