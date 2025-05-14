import jsPDF from "jspdf";

const useFeedbackExport = (selectedMonth, selectedYear, feedbackData) => {
  const handleFeedbackExport = () => {
    if (!selectedMonth) {
      alert("Please select a month to export feedback");
      return;
    }

    const doc = new jsPDF();
    const pageHeight = 297; // A4 height in mm
    const marginBottom = 20;
    const marginLeft = 10;
    const marginRight = 190;
    let yPosition = 10;

    // Colors
    const headerBgColor = "#008080";
    const headerTextColor = "#ffffff";
    const sectionHeaderColor = "#008080";
    const lineColor = "#cccccc";

    // Add page header with background color and page number
    const addPageHeader = (title, pageNum) => {
      doc.setFillColor(headerBgColor);
      doc.rect(0, 0, 210, 20, "F");
      doc.setFontSize(16);
      doc.setTextColor(headerTextColor);
      doc.setFont("helvetica", "bold");
      doc.text(title, marginLeft, 14);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Generated on: ${new Date().toLocaleDateString()}`,
        marginLeft,
        19
      );
      doc.text(`Page ${pageNum}`, marginRight, 14);
      doc.setTextColor("#000000");
      yPosition = 30;
    };

    // Add page footer with a line and copyright text
    const addPageFooter = () => {
      const footerY = pageHeight - 10;
      doc.setDrawColor(lineColor);
      doc.setLineWidth(0.5);
      doc.line(marginLeft, footerY, marginRight, footerY);
      doc.setFontSize(9);
      doc.setTextColor("#666666");
      doc.text(
        "© Castor Z. Conception Memorial National High School",
        marginLeft,
        footerY + 5
      );
    };

    // Start with first page header and footer
    let pageNum = 1;
    addPageHeader(
      `Feedback Report for ${selectedMonth} ${selectedYear}`,
      pageNum
    );
    addPageFooter();

    // Role display mapping
    const roleDisplayMap = {
      student: "Student",
      employee: "Employee",
      parent: "Parent/Guardian",
      visitor: "Visitor",
    };

    // Summary statistics header with background highlight
    if (yPosition + 15 > pageHeight - marginBottom) {
      doc.addPage();
      pageNum++;
      addPageHeader(
        `Feedback Report for ${selectedMonth} ${selectedYear} (cont.)`,
        pageNum
      );
      addPageFooter();
    }
    doc.setFillColor("#e3f2fd");
    doc.rect(marginLeft - 2, yPosition - 8, 190, 10, "F");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Summary Statistics", marginLeft, yPosition);
    yPosition += 12;

    // Check if feedback data exists
    if (!feedbackData || feedbackData.length === 0) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        "No feedback data available for the selected period",
        marginLeft,
        yPosition
      );
      doc.save(`feedback_report_${selectedMonth}_${selectedYear}.pdf`);
      return;
    }

    feedbackData.forEach((item, index) => {
      // Page break check for question header
      if (yPosition + 20 > pageHeight - marginBottom) {
        doc.addPage();
        pageNum++;
        addPageHeader(
          `Feedback Report for ${selectedMonth} ${selectedYear} (cont.)`,
          pageNum
        );
        addPageFooter();
      }

      // Question header with underline
      doc.setFontSize(10.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(sectionHeaderColor);
      doc.text(
        `Question ${index + 1}: ${item.question}`,
        marginLeft,
        yPosition
      );
      yPosition += 6;

      // Draw underline
      doc.setDrawColor(sectionHeaderColor);
      doc.setLineWidth(0.8);
      doc.line(marginLeft, yPosition, marginRight, yPosition);
      yPosition += 8;

      // Find unique roles for this question from breakdowns
      const rolesSet = new Set();
      (item.data || []).forEach(rating => {
        if (rating.breakdown) {
          Object.keys(rating.breakdown).forEach(roleKey => {
            rolesSet.add(roleKey);
          });
        }
      });
      // Use display names if available
      const uniqueRoles = Array.from(rolesSet).map(
        role => roleDisplayMap[role.toLowerCase()] || role
      );

      // Roles participated text
      if (yPosition + 10 > pageHeight - marginBottom) {
        doc.addPage();
        pageNum++;
        addPageHeader(
          `Feedback Report for ${selectedMonth} ${selectedYear} (cont.)`,
          pageNum
        );
        addPageFooter();
      }
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor("#000000");
      if (uniqueRoles.length > 0) {
        doc.text(
          `Roles participated: ${uniqueRoles.join(", ")}`,
          marginLeft,
          yPosition
        );
      } else {
        doc.text("No role information available", marginLeft, yPosition);
      }
      yPosition += 10;

      // Overall rating distribution header
      if (yPosition + 10 > pageHeight - marginBottom) {
        doc.addPage();
        pageNum++;
        addPageHeader(
          `Feedback Report for ${selectedMonth} ${selectedYear} (cont.)`,
          pageNum
        );
        addPageFooter();
      }
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#333333");
      doc.text("Overall Rating Distribution:", marginLeft, yPosition);
      yPosition += 8;

      // Ratings data
      (item.data || []).forEach((rating) => {
        if (yPosition + 8 > pageHeight - marginBottom) {
          doc.addPage();
          pageNum++;
          addPageHeader(
            `Feedback Report for ${selectedMonth} ${selectedYear} (cont.)`,
            pageNum
          );
          addPageFooter();
        }
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor("#000000");
        doc.text(
          `- ${rating.name}: ${rating.value}% (${rating.count} responses)`,
          marginLeft + 5,
          yPosition
        );
        yPosition += 7;
      });

      // Detailed breakdown by role header
      if (uniqueRoles.length > 0) {
        if (yPosition + 15 > pageHeight - marginBottom) {
          doc.addPage();
          pageNum++;
          addPageHeader(
            `Feedback Report for ${selectedMonth} ${selectedYear} (cont.)`,
            pageNum
          );
          addPageFooter();
        }
        yPosition += 5;
        doc.setFontSize(11);
        doc.setFont("helvetica", "bolditalic");
        doc.setTextColor("#555555");
        doc.text("Detailed Breakdown by Role:", marginLeft, yPosition);
        yPosition += 8;

        uniqueRoles.forEach((role) => {
          const neededSpace = 7 + 7 * ((item.data || []).length);
          if (yPosition + neededSpace > pageHeight - marginBottom) {
            doc.addPage();
            pageNum++;
            addPageHeader(
              `Feedback Report for ${selectedMonth} ${selectedYear} (cont.)`,
              pageNum
            );
            addPageFooter();
          }

          doc.setFontSize(10);
          doc.setFont("helvetica", "bold");
          doc.setTextColor("#000000");
          doc.text(`- ${role}:`, marginLeft + 5, yPosition);
          yPosition += 7;

          const roleCounts = {};
          let roleTotal = 0;
          (item.data || []).forEach((rating) => {
            // Find the raw role key for this display name
            let rawRole = Object.keys(roleDisplayMap).find(
              key => roleDisplayMap[key] === role
            ) || role;
            // Try both display and raw role
            const count = rating.breakdown?.[role] ?? rating.breakdown?.[rawRole] ?? 0;
            roleCounts[rating.name] = count;
            roleTotal += count;
          });

          (item.data || []).forEach((rating) => {
            const count = roleCounts[rating.name] || 0;
            const percentage = roleTotal > 0 ? Math.round((count / roleTotal) * 100) : 0;
            doc.setFont("helvetica", "normal");
            doc.text(
              `  ${rating.name}: ${percentage}% (${count})`,
              marginLeft + 10,
              yPosition
            );
            yPosition += 7;
          });

          yPosition += 5; // Extra space between roles
        });
      }

      yPosition += 15; // Space before next question
    });

    // Save the PDF
    doc.save(`feedback_report_${selectedMonth}_${selectedYear}.pdf`);
  };

  return { handleFeedbackExport };
};

export default useFeedbackExport;
