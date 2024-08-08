import { PDFDownloadLink } from "@react-pdf/renderer";
import { useDebounce } from "@uidotdev/usehooks";
import FileSaver from "file-saver";
import React, { FC } from "react";
import { Invoice, TInvoice } from "../data/types.ts";
import InvoicePage from "./InvoicePage.tsx";

interface Props {
  data: Invoice;
  setData(data: Invoice): void;
}

const Download: FC<Props> = ({ data, setData }) => {
  const debounced = useDebounce(data, 500);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    file
      .text()
      .then((str: string) => {
        try {
          if (!(str.startsWith("{") && str.endsWith("}"))) {
            str = atob(str);
          }
          const d = JSON.parse(str);
          const dParsed = TInvoice.parse(d);
          console.info("parsed correctly");
          setData(dParsed);
        } catch (e) {
          console.error(e);
          return;
        }
      })
      .catch((err) => console.error(err));
  }

  function handleSaveTemplate() {
    const blob = new Blob([JSON.stringify(debounced)], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, `${title}.template`);
  }

  const title = data.invoiceTitle ? data.invoiceTitle.toLowerCase() : "invoice";
  return (
    <div className="download-pdf">
      <PDFDownloadLink
        key="pdf"
        document={<InvoicePage pdfMode={true} data={debounced} />}
        fileName={`${title}.pdf`}
        aria-label="Save PDF"
        title="Save PDF"
        className="download-pdf__pdf"
      >
        {({ loading }) => (loading ? "Loading document..." : "")}
      </PDFDownloadLink>
      {/* <button
        onClick={handleSaveTemplate}
        aria-label="Save Template"
        title="Save Template"
        className="download-pdf__template_download mt-40"
      >
        Save Template
      </button> */}
      {/* <label className="download-pdf__template_upload">
        <input type="file" accept=".json,.template" onChange={handleInput} />
      </label>
      <p className="text-small">Upload Template</p> */}
    </div>
  );
};

export default Download;
