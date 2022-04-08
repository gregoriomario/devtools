import React, { useState } from "react";
import Content from "../../layout/Content";
import Grid from "../../layout/Content/Grid";
import Button from "../../shared/Button";
import DropDown from "../../shared/DropDown";
import Image, { ImageType } from "../../shared/Image";
import Input from "../../shared/Input";

type ImageConfiguration = {
  width: string;
  height: string;
  format: "jpeg" | "png";
};

type InputAtt<T> = {
  onChange: (e: T) => void;
  value: string;
  side: boolean;
  label: string;
  className: string;
  type: string;
};

const ImageResize = () => {
  const [drag, setDrag] = useState<boolean>(false);
  const [images, setImage] = useState<Array<ImageType>>([]);
  const [resolution, setResolution] = useState<ImageConfiguration>({
    width: "",
    height: "",
    format: "jpeg",
  });

  const handleConfiguration = (change: keyof ImageConfiguration) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (change !== "format" && e.target.value.match(/[a-z]/i)) return;
      setResolution({
        ...resolution,
        [change]: e.target.value,
      });
    };
  };

  const inputs: InputAtt<
    React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  >[] = [
    {
      onChange: handleConfiguration("width"),
      value: resolution.width,
      side: true,
      label: "width",
      className: "form-input",
      type: "text",
    },
    {
      onChange: handleConfiguration("height"),
      value: resolution.height,
      side: true,
      label: "height",
      className: "form-input",
      type: "text",
    },
    {
      onChange: handleConfiguration("format"),
      value: resolution.format,
      side: true,
      label: "format",
      className: "form-input",
      type: "select",
    },
  ];

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = await window.api.processImage({ ...resolution, images });
  };

  const handleDrag = (
    state?: boolean,
    cb?: (e: React.DragEvent<HTMLDivElement>) => void
  ) => {
    return (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (state !== undefined) setDrag(state);
      if (cb) cb(e);
    };
  };

  const handleUpload = async () => {
    const content = await window.api.uploadFile(["png", "jpg", "jpeg"]);
    setImage(content);
    setDrag(false);
  };

  const handleDragUpload = async (e: React.DragEvent) => {
    const len = e.dataTransfer.items.length;
    const imagesUpload = [];

    for (const x in [...Array(len)]) {
      const file = e.dataTransfer.files.item(+x) as File & { path: string };
      if (!file.type.includes("image")) {
        continue;
      }
      imagesUpload.push(file?.path as string);
    }
    const content = await window.api.dragUploadFile(imagesUpload);
    setImage(content);
    setDrag(false);
  };

  const renderImages = () => {
    if (images?.length > 4) {
      return (
        <Grid row="grid-rows-2" col="grid-cols-2" gapY="gap-y-2" gapX="gap-x-2">
          {images.map((image, index) => {
            if (index > 3) return;
            return (
              <Image
                over={index === 3 ? images.length - 3 : 0}
                key={image.name}
                src={image}
              ></Image>
            );
          })}
        </Grid>
      );
    }
    switch (images?.length) {
      case 1:
        return <Image className="w-full h-full" src={images[0]} />;
      case 2:
        return (
          <Grid row="grid-rows-2" gapY="gap-y-2">
            {images.map((image) => {
              return <Image key={image.name} src={image}></Image>;
            })}
          </Grid>
        );
      case 3:
        return (
          <Grid
            row="grid-rows-2"
            col="grid-cols-2"
            gapY="gap-y-2"
            gapX="gap-x-2"
          >
            {images.map((image, index) => {
              return (
                <Image
                  key={image.name}
                  className={index === 0 ? "col-span-2" : ""}
                  src={image}
                ></Image>
              );
            })}
          </Grid>
        );
      case 4:
        return (
          <Grid
            row="grid-rows-2"
            col="grid-cols-2"
            gapY="gap-y-2"
            gapX="gap-x-2"
          >
            {images.map((image, index) => {
              return <Image key={image.name} src={image}></Image>;
            })}
          </Grid>
        );
      default:
        return;
    }
  };

  return (
    <Content className="grid gap-x-6 gap-y-6 grid-cols-2 grid-rows-2 h-full">
      <Content
        className={`relative bg-white h-full w-full rounded-lg ${
          drag && "bg-slate-300"
        }`}
      >
        <Content
          className="absolute h-full w-full opacity-0 z-20"
          onDrop={handleDrag(false, handleDragUpload)}
          onDragOver={handleDrag()}
          onClick={handleDrag(true, handleUpload)}
          onDragEnter={handleDrag(true)}
          onDragLeave={handleDrag(false)}
        />
        <Content className="absolute flex justify-center items-center text-neutral-600 font-semibold text-lg top-0 w-full h-full">
          <Content className="flex flex-col">
            {" "}
            <svg
              className="mx-auto h-12 w-12 text-neutral-600"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <p>Upload File</p>
          </Content>
        </Content>
      </Content>
      <Content className="w-full h-full overflow-hidden">
        {renderImages()}
      </Content>
      <form className="flex flex-col gap-y-3" onSubmit={handleSave}>
        {inputs.map((input) => {
          if (input.type === "select") {
            return (
              <DropDown key={input.label} {...input}>
                <DropDown.Item>jpeg</DropDown.Item>
                <DropDown.Item>png</DropDown.Item>
              </DropDown>
            );
          }
          return <Input key={input.label} {...input} />;
        })}
        <Button type="submit">Save</Button>
      </form>
    </Content>
  );
};

export default ImageResize;
