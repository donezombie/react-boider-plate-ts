import CommonIcons from "@/components/CommonIcons";
import React from "react";
import { useTranslation } from "react-i18next";

const NoDataRow = React.memo(
  ({ style }: React.PropsWithChildren<{ style?: React.CSSProperties }>) => {
    const { t } = useTranslation();

    return (
      <div style={style} className="table__no-data-row">
        <CommonIcons.InboxIcon size={36} />
        {t("validationMessage.noDataFound")}
      </div>
    );
  }
);

export default NoDataRow;
