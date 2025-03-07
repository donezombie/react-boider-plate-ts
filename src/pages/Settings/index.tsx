import CommonIcons from "@/components/CommonIcons";
import Divider from "@/components/Divider";
import PageWrapper from "@/components/PageWrapper";
import { TabAccountEnum } from "@/consts/common";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import TabProfile from "./Tabs/TabProfile";
import { cn } from "@/lib/utils";
import TabAccount from "./Tabs/TabAccount";

const Settings = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<
    (typeof TabAccountEnum)[keyof typeof TabAccountEnum]
  >(TabAccountEnum.Profile);

  const tabs = [
    {
      icon: <CommonIcons.UserIcon size={16} />,
      label: t("account.profile"),
      value: TabAccountEnum.Profile,
    },
    {
      icon: <CommonIcons.WrenchIcon size={16} />,
      label: t("account.account"),
      value: TabAccountEnum.Account,
    },
  ];

  const mappedByTab = {
    [TabAccountEnum.Account]: <TabAccount />,
    [TabAccountEnum.Profile]: <TabProfile />,
  };

  return (
    <PageWrapper>
      <div className="component:Settings">
        <h1 className="header-text">{t("settings")}</h1>
        <p className="mt-2 text-muted-foreground">{t("account.subHeader")}</p>

        <Divider />

        <div className="flex flex-col gap-10 md:flex-row">
          <div className="account__left w-full min-w-[200px] md:w-[20%]">
            {tabs.map((el) => {
              return (
                <p
                  key={el.label}
                  className={cn(
                    "is-hover mb-1 flex items-center gap-3 p-2 text-sm font-medium",
                    el.value === tab && "is-tab-active"
                  )}
                  onClick={() => setTab(el.value)}
                >
                  {el.icon} {el.label}
                </p>
              );
            })}
          </div>
          <div className="account__right flex-grow">
            {mappedByTab?.[tab] || <Fragment />}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Settings;
