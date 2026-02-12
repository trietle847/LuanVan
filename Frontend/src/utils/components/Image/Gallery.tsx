import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import {
  Box,
  IconButton,
  Checkbox,
  Chip,
  FormControlLabel,
  CardMedia,
  Typography,
} from "@mui/material";
import { Collections, HighlightOff } from "@mui/icons-material";
import { useState, useEffect } from "react";

/* ================= TYPES ================= */

export interface ImageItem {
  id: number;
  url: string;
}

interface GalleryProps {
  items: ImageItem[];
  editable?: boolean;
  onSelectionChange?: (ids: number[]) => void;
  clearSelectionSignal?: any;
}

/* ================= COMPONENT ================= */

export default function Gallery({
  items,
  editable = false,
  onSelectionChange,
  clearSelectionSignal,
}: GalleryProps) {
  /* ===== LIGHTBOX ===== */
  const slides = items.map((img) => ({
    src: img.url,
    id: img.id,
  }));

  /* ===== STATE ===== */
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  /* ===== TOGGLE ONE ===== */
  const toggleSelect = (id: number) => {
    const next = new Set(selectedIds);

    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }

    setSelectedIds(next);
    setSelectAll(next.size === items.length);
    onSelectionChange?.([...next]);
  };

  /* ===== TOGGLE ALL ===== */
  const toggleSelectAll = () => {
    const nextAll = !selectAll;
    const next = new Set<number>();

    if (nextAll) {
      items.forEach((img) => next.add(img.id));
    }

    setSelectAll(nextAll);
    setSelectedIds(next);
    onSelectionChange?.([...next]);
  };

  /* ===== CLEAR FROM PARENT ===== */
  useEffect(() => {
    setSelectedIds(new Set());
    setSelectAll(false);
    onSelectionChange?.([]);
  }, [clearSelectionSignal]);

  /* ================= RENDER ================= */

  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography fontWeight={600} display="flex" alignItems="center">
          <Collections sx={{ mr: 1 }} />
          Hình ảnh hiện có
        </Typography>

        {editable && items.length > 0 && (
          <FormControlLabel
            label="Chọn xóa tất cả"
            control={
              <Checkbox checked={selectAll} onChange={toggleSelectAll} />
            }
          />
        )}
      </Box>

      {/* ===== GRID ===== */}
      {items.length === 0 ? (
        <Box textAlign="center" py={5} color="text.secondary">
          Không có ảnh nào
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: 2,
            p: 1,
            border: "1px solid #e5e7eb",
            borderRadius: 2,
          }}
        >
          {items.map((img, idx) => {
            const selected = selectedIds.has(img.id);

            return (
              <Box
                key={img.id}
                sx={{
                  position: "relative",
                  aspectRatio: "1",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: selected
                    ? "3px solid #ef4444"
                    : "3px solid transparent",
                }}
                onClick={() => {
                  if (editable && selected) {
                    toggleSelect(img.id);
                    return;
                  }

                  setIndex(idx);
                  setOpen(true);
                }}
              >
                <CardMedia
                  component="img"
                  image={img.url}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                {editable && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(img.id);
                    }}
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      color: selected ? "#ef4444" : "#9ca3af",
                      bgcolor: "rgba(255,255,255,0.85)",
                    }}
                  >
                    <HighlightOff />
                  </IconButton>
                )}

                {selected && editable && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: "rgba(255,255,255,0.65)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Chip label="Sẽ xóa" color="error" />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      )}

      {/* ===== LIGHTBOX ===== */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        plugins={[Thumbnails, Fullscreen, Zoom]}
      />
    </Box>
  );
}
