import { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
);

interface UploadFileProps {
  label?: string;
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: string;
  compact?: boolean;
  columns?: number;
  previewHeight?: number;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

export default function UploadFile({
  label,
  onChange,
  maxFiles = 5,
  acceptedFileTypes = ["image/*"],
  maxFileSize = "5MB",
  compact = false,
  columns = 2,
  previewHeight = 120,
  required = false,
  error = false,
  helperText,
}: UploadFileProps) {
  const [files, setFiles] = useState<any[]>([]);
  const { formState } = useFormContext();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setFiles([]);
    }
  }, [formState.isSubmitSuccessful]);

  const handleUpdateFiles = (fileItems: any[]) => {
    setFiles(fileItems);
    onChange?.(fileItems.map((f) => f.file));
  };

  const columnWidth = `calc(${100 / columns}% - 0.5em)`;

  return (
    <Box
      sx={{
        width: "100%",
        ...(compact && {
          "& .filepond--item": { width: columnWidth },
          "& .filepond--image-preview": {
            height: `${previewHeight}px !important`,
          },
        }),
        "& .filepond--panel-root": {
          backgroundColor: "#f9fafb",
          border: error ? "2px solid #ef4444" : "2px dashed #d1d5db",
          borderRadius: 2,
        },
        "& .filepond--credits": { display: "none" },
      }}
    >
      {label && (
        <Typography variant="subtitle1">
          {label}
          {required && " *"}
        </Typography>
      )}
      {error && helperText && (
        <Typography variant="caption" color="error">
          {helperText}
        </Typography>
      )}

      <FilePond
        files={files}
        onupdatefiles={handleUpdateFiles}
        allowMultiple={maxFiles > 1}
        maxFiles={maxFiles}
        acceptedFileTypes={acceptedFileTypes}
        maxFileSize={maxFileSize}
        imagePreviewHeight={compact ? previewHeight : 170}
        labelIdle='Kéo thả ảnh hoặc <span class="filepond--label-action">Chọn file</span>'
      />
    </Box>
  );
}
