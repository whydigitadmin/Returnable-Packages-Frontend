import { Image } from "@react-pdf/renderer";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { FC, useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside.ts";
import compose from "../styles/compose.ts";

interface Props {
  className?: string;
  placeholder?: string;
  value?: string | Blob;
  width?: number;
  onChangeImage?: (value: string) => void;
  onChangeWidth?: (value: number) => void;
  pdfMode?: boolean;
}

const EditableFileImage: FC<Props> = ({
  className,
  placeholder,
  value,
  width,
  onChangeImage,
  onChangeWidth,
  pdfMode,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const widthWrapper = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const marks = {
    100: "100px",
    150: "150px",
    200: "200px",
    250: "250px",
  };

  const handleClickOutside = () => {
    if (isEditing) {
      setIsEditing(false);
    }
  };

  useOnClickOutside(widthWrapper, handleClickOutside);

  const handleUpload = () => {
    fileInput?.current?.click();
  };

  const handleChangeImage = () => {
    if (fileInput?.current?.files) {
      const files = fileInput.current.files;

      if (files.length > 0 && typeof onChangeImage === "function") {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          if (typeof reader.result === "string") {
            onChangeImage(reader.result);
          }
        });

        reader.readAsDataURL(files[0]);
      }
    }
  };

  const handleChangeWidth = (value: number) => {
    if (typeof onChangeWidth === "function") {
      onChangeWidth(value);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const clearImage = () => {
    if (typeof onChangeImage === "function") {
      onChangeImage("");
    }
  };

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
      {!imageSrc ? (
        <button type="button" className="image__upload" onClick={handleUpload}>
          {placeholder}
        </button>
      ) : (
        <>
          <img
            src={imageSrc}
            className="image__img"
            alt={placeholder}
            style={{ maxWidth: width || 100 }}
          />

          <button
            type="button"
            className="image__change"
            onClick={handleUpload}
          >
            Change Image
          </button>

          <button type="button" className="image__edit" onClick={handleEdit}>
            Resize Image
          </button>

          <button type="button" className="image__remove" onClick={clearImage}>
            Remove
          </button>

          {isEditing && (
            <div ref={widthWrapper} className="image__width-wrapper">
              <Slider
                min={100}
                max={250}
                marks={marks}
                included={false}
                step={1}
                onChange={handleChangeWidth as any}
                defaultValue={width || 100}
              />
            </div>
          )}
        </>
      )}

      <input
        ref={fileInput}
        tabIndex={-1}
        type="file"
        accept="image/*"
        className="image__file"
        onChange={handleChangeImage}
      />
    </div>
  );
};

export default EditableFileImage;
