import React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import Dropzone from "react-dropzone";
import PageWrapper from "@/components/PageWrapper";
import CommonIcons from "@/components/CommonIcons";
import { Form, Formik } from "formik";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/helpers/common";
import { showError, showSuccess } from "@/helpers/toast";
import AdminService from "@/services/AdminService";

interface ImportDataProps {}

const ImportData = (props: React.PropsWithChildren<ImportDataProps>) => {
  //! State
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <PageWrapper>
      <div className={cn("component:ImportData")}>
        <h3 className="header-text mb-6">{t("sidebar.importData")}</h3>

        <Formik
          initialValues={{ file: undefined }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              setSubmitting(true);
              if (values.file) {
                await AdminService.importCustomer(values.file);
                showSuccess(t("success.uploadSuccessfully"));
              }
              resetForm();
            } catch (error) {
              showError(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, values, isSubmitting }) => {
            const file = values?.file as File | undefined;

            return (
              <Form>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    setFieldValue("file", acceptedFiles[0]);
                  }}
                  maxFiles={1}
                  accept={{
                    "text/csv": [".csv"],
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="flex h-[80px] w-full items-center justify-center rounded-md border-2 border-dashed bg-gray-100">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className="text-sm text-muted-foreground">
                          <CommonIcons.File
                            size={16}
                            className="mr-2 inline-block"
                          />
                          Drag 'n' drop file here, or click to select file
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>

                {file && (
                  <div className="mt-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>File</TableHead>
                          <TableHead>Length</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell>{file.name}</TableCell>
                          <TableCell>{formatBytes(file.size, 2)}</TableCell>
                          <TableCell>
                            <div className="flex">
                              <Button type="submit" isLoading={isSubmitting}>
                                <CommonIcons.UploadCloudIcon
                                  size={16}
                                  className="mr-1"
                                />{" "}
                                {t("upload")}
                              </Button>
                              <Button
                                className="ml-1"
                                variant={"ghost"}
                                onClick={() => setFieldValue("file", undefined)}
                                disabled={isSubmitting}
                              >
                                <span className="text-red-500">
                                  <CommonIcons.Trash2Icon
                                    className="inline-block translate-y-[-1px]"
                                    size={16}
                                  />{" "}
                                  {t("remove")}
                                </span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </PageWrapper>
  );
};

export default ImportData;
