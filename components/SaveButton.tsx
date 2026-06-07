"use client";

import { useState } from "react";
import { Button } from "@mantine/core";
import styles from "./SaveButton.module.css";

export default function SaveButton() {
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleClick}
      fullWidth
      size="md"
      color="red"
      className={`${styles.button} ${saved ? styles.saved : ""}`}
    >
      {saved ? "✓" : "Tipps speichern"}
    </Button>
  );
}
