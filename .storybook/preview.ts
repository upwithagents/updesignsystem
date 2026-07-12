import type { Preview } from "@storybook/react";
import "../src/styles/theme.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "paper",
      values: [
        { name: "paper", value: "#fdfbf7" },
        { name: "dark", value: "#241f1b" },
      ],
    },
  },
};

export default preview;
