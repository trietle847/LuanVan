import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import bookingDetailApi from "../../../services/bookingDetail.api";
import { useParams } from "react-router-dom";

export interface BookingDetail {
  id: number;
  date: string;
  courtId: number;
  start: string;
  end: string;
}

interface Props {
  onSelectRanges: (ranges: { start: Date; end: Date }[]) => void;
}

export default function CourtWeeklySchedule({ onSelectRanges }: Props) {
  const { id } = useParams();
  const [events, setEvents] = useState<BookingDetail[]>([]);
  const [selectedRanges, setSelectedRanges] = useState<
    { start: Date; end: Date }[]
  >([]);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const data = await bookingDetailApi.getByCourtId(Number(id));
      setEvents(data);
    })();
  }, [id]);

  useEffect(() => {
    onSelectRanges(selectedRanges);
  }, [selectedRanges]);

  const bookedEvents = events.map((e) => ({
    id: String(e.id),
    title: "Booked",
    start: `${e.date.split("T")[0]}T${e.start}`,
    end: `${e.date.split("T")[0]}T${e.end}`,
    backgroundColor: "#9ca3af",
    borderColor: "transparent",
  }));

  const Legend = () => (
    <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
      <LegendItem color="#fff" text="Còn trống" />
      <LegendItem color="#f44336" text="Đã đặt" />
      <LegendItem color="#22C55e" text="Đang chọn" />
      <LegendItem color="#9e9e9e" text="Bảo trì" />
    </div>
  );

  const LegendItem = ({ color, text }: { color: string; text: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 16,
          height: 16,
          backgroundColor: color,
          borderRadius: 4,
          border: "1px solid #ccc",
        }}
      />
      <span>{text}</span>
    </div>
  );

  const selectedEvents = selectedRanges.map((r, i) => ({
    id: "select-" + i,
    start: r.start,
    end: r.end,
    display: "background",
    backgroundColor: "#22C55e", // màu xanh chọn
  }));

  const handleDateClick = (info: any) => {
    const clickedStart = info.date;
    const clickedEnd = new Date(clickedStart.getTime() + 30 * 60000); // 30 phút

    if (clickedEnd < new Date()) return;
    const isConflict = bookedEvents.some((e) => {
      const start = new Date(e.start);
      const end = new Date(e.end);
      return clickedStart < end && clickedEnd > start;
    });

    if (isConflict) return;
    console.log(
      "Click slot:",
      clickedStart.toISOString(),
      "->",
      clickedEnd.toISOString(),
    );

    setSelectedRanges((prev) => {
      console.log("Trước khi xử lý:", prev);

      // bỏ chọn
      const insideIndex = prev.findIndex(
        (r) => clickedStart >= r.start && clickedEnd <= r.end,
      );

      if (insideIndex !== -1) {
        console.log("Slot đã được chọn, tiến hành bỏ chọn");

        const r = prev[insideIndex];
        const newRanges = [...prev];
        newRanges.splice(insideIndex, 1);

        // tách nếu ở giữa
        if (clickedStart > r.start) {
          newRanges.push({ start: r.start, end: clickedStart });
        }
        if (clickedEnd < r.end) {
          newRanges.push({ start: clickedEnd, end: r.end });
        }

        console.log("Sau khi bỏ chọn:", newRanges);
        return newRanges;
      }

      // 2. Chưa có → merge theo kiểu interval chuẩn
      console.log("Slot chưa chọn, tiến hành gộp");

      let newStart = clickedStart;
      let newEnd = clickedEnd;
      const newRanges: { start: Date; end: Date }[] = [];

      prev.forEach((r) => {
        const overlapOrTouch = newStart <= r.end && newEnd >= r.start; // chồng hoặc chạm

        if (overlapOrTouch) {
          newStart = new Date(Math.min(newStart.getTime(), r.start.getTime()));
          newEnd = new Date(Math.max(newEnd.getTime(), r.end.getTime()));
        } else {
          newRanges.push(r);
        }
      });

      newRanges.push({ start: newStart, end: newEnd });

      console.log("cuối cùng", newRanges);
      return newRanges;
    });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height="auto"
        slotMinTime="03:00:00"
        slotMaxTime="24:00:00"
        allDaySlot={false}
        nowIndicator
        dateClick={handleDateClick}
        selectable
        selectAllow={(selectInfo) => {
          const selectStart = selectInfo.start;
          const selectEnd = selectInfo.end;

          return !bookedEvents.some((event) => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            return selectStart < eventEnd && selectEnd > eventStart;
          });
        }}
        events={[...bookedEvents, ...selectedEvents]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
      />{" "}
      <Legend />
    </Box>
  );
}
