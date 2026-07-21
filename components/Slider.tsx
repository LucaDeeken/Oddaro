import { IconGripHorizontal, IconPoint } from "@tabler/icons-react";
import { Slider } from "@mantine/core";
import classes from "./Slider.module.css";

type SliderWhiteProps = {
  numberOfMatchdays: number;
  value: number;
  onChange: (value: number) => void;
};

export function SliderWhite({
  numberOfMatchdays,
  value,
  onChange,
}: SliderWhiteProps) {
  return (
    <Slider
      min={1}
      max={numberOfMatchdays}
      value={value}
      onChange={onChange}
      classNames={classes}
    />
  );
}
