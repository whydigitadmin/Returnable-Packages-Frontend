import { PDFDownloadLink } from "@react-pdf/renderer";
import { useDebounce } from "@uidotdev/usehooks";
import FileSaver from "file-saver";
import React, { FC } from "react";
import { InvoiceNew, TInvoiceNew } from "../data/types.ts";
import InvoicePageNew from "./InvoicePageNew.tsx";

interface Props {
  data: InvoiceNew;
  setData(data: InvoiceNew): void;
}

const DownloadNew: FC<Props> = ({ data, setData }) => {
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
          const dParsed = TInvoiceNew.parse(d);
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
    FileSaver(blob, title + ".template");
  }

  const title = data.invoiceTitle ? data.invoiceTitle.toLowerCase() : "invoice";
  return (
    <div className={"download-pdf "}>
      <PDFDownloadLink
        key="pdf"
        document={<InvoicePageNew pdfMode={true} data={debounced} />}
        fileName={`${title}.pdf`}
        aria-label="Save PDF"
        title="Save PDF"
        className="download-pdf__pdf"
      ></PDFDownloadLink>
      {/* <p>PDF</p> */}

      {/* <button
        onClick={handleSaveTemplate}
        aria-label="Save Template"
        title="Save Template"
        className="download-pdf__template_download mt-40"
      /> */}
      {/* <p className="text-small">Save Template</p>
      <label className="download-pdf__template_upload">
        <input type="file" accept=".json,.template" onChange={handleInput} />
      </label>
      <p className="text-small">Upload Template</p> */}
    </div>
  );
};

export default DownloadNew;
