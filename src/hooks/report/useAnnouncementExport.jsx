import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const useAnnouncementExport = () => {
  const handleAnnouncementExport = (
    filteredAnnouncements,
    dateRange = {},
    searchQuery = ""
  ) => {
    const doc = new jsPDF();

    const teal = "#008080";
    const tealDark = "#005959";
    const tealLight = "#e0f7fa";

    // Build filter label
    let filterLabel = "";
    const hasDate = dateRange.start || dateRange.end;
    const hasSearch = searchQuery && searchQuery.trim() !== "";
    if (!hasDate && !hasSearch) {
      filterLabel = "All archived";
    } else {
      if (hasDate) {
        filterLabel += "Date Range: ";
        filterLabel += dateRange.start
          ? new Date(dateRange.start).toLocaleDateString()
          : "Any";
        filterLabel += " - ";
        filterLabel += dateRange.end
          ? new Date(dateRange.end).toLocaleDateString()
          : "Any";
      }
      if (hasDate && hasSearch) filterLabel += " | ";
      if (hasSearch) {
        filterLabel += `Search: ${searchQuery}`;
      }
    }

    // Title
    doc.setFontSize(18);
    doc.setTextColor(teal);
    doc.setFont("helvetica", "bold");
    doc.text("Archived Announcements Report", 14, 15);

    let nextY = 22;
    if (filterLabel) {
      doc.setFontSize(12);
      doc.setTextColor(tealDark);
      doc.setFont("helvetica", "bold");
      doc.text(filterLabel, 14, nextY);
      nextY += 7;
    }

    // Subtitle / Date
    doc.setFontSize(11);
    doc.setTextColor(tealDark);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, nextY);
    nextY += 6;

    // Prepare table data
    const tableData = filteredAnnouncements.map((ann) => [
      ann.announcement_id,
      ann.announcement_start_date
        ? new Date(ann.announcement_start_date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
          })
        : "",
      ann.announcement_end_date
        ? new Date(ann.announcement_end_date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
          })
        : "",
      ann.announcement_title,
      ann.announcement_description || "N/A",
    ]);

    // Table columns widths
    const columnWidths = {
      // 0: { cellWidth: 24 },
      // 1: { cellWidth: 25 },
      // 2: { cellWidth: 25 },
      // 3: { cellWidth: 50 },
      4: { cellWidth: 66 },
    };

    autoTable(doc, {
      head: [
        [
          "Announcement ID",
          "Start Date",
          "End Date",
          "Announcement Title",
          "Announcement Description",
        ],
      ],
      body: tableData,
      startY: nextY + 2,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
        font: "helvetica",
        textColor: "#222222",
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        fillColor: teal,
        textColor: "#ffffff",
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: tealLight,
      },
      columnStyles: columnWidths,
      tableWidth: "auto",
      margin: { left: 14, right: 14 },
      didDrawPage: (data) => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(9);
        doc.setTextColor(tealDark);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      },
    });

    doc.save(`archived_announcements_report.pdf`);
  };

  return { handleAnnouncementExport };
};

export default useAnnouncementExport;
