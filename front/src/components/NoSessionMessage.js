import React from "react";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const NoSessionMessage = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        width: "100%",
      }}
    >
      <Typography variant="h6">{t("forbidden-language")}</Typography>
      <Typography variant="subtitle1">{t("comingSoon")}</Typography>
      <Button variant="contained" color="primary" href="/">
        Back to home
      </Button>
    </div>
  );
};

export default NoSessionMessage;
