"use strict";
const path = require("path");

import {
  BOLD,
  BOLD_SC,
  LIGHT,
  EXTRA_BOLD,
  MEDIUM_SC,
  SEMI_BOLD,
  SEMI_BOLD_ITALIC,
  ITALIC,
  LIGHT_ITALIC_SC,
} from "./constants/fonts";

const NUM_COLUMNS = 3;
const MARGIN = 20;

export const PAGE_WIDTH = 252;
export const PAGE_HEIGHT = 414;

const FONT_SIZE = 18;
const HEADER_FONT_SIZE = 31;
const LEADING = FONT_SIZE;
const GUTTER = 17;
const PADDING = 6;

const COLUMN_WIDTH =
  (PAGE_WIDTH -
    MARGIN * 2 -
    NUM_COLUMNS * (PADDING * 2) -
    (NUM_COLUMNS - 1) * GUTTER) /
  NUM_COLUMNS;
const BOX_WIDTH = COLUMN_WIDTH + PADDING * 2;

const Renderer = function (doc, data) {
  function header(x, y) {
    doc
      .font(MEDIUM_SC)
      .fontSize(HEADER_FONT_SIZE)
      .text(data.name, x + MARGIN, y + MARGIN, {
        width: 180,
        lineGap: -6,
      })

      .font(MEDIUM_SC)
      .fontSize(FONT_SIZE)
      .text(data.note, { width: PAGE_WIDTH - 48, lineGap: -5 });
  }

  function createLogo(x, y) {
    const width = 50;
    doc.image(
      path.join(__dirname, "assets/images/logo.png"),
      x + PAGE_WIDTH - MARGIN - width,
      y + PAGE_HEIGHT - MARGIN - width,
      { width: 50 }
    );
  }

  function createArrow(x, y) {
    const arrowWidth = 33;
    const { reverseArrow } = data.options;

    if (reverseArrow) {
      doc.image(
        path.join(__dirname, "assets/images/arrow-down.png"),
        x + PAGE_WIDTH / 2 - arrowWidth / 2,
        y + PAGE_HEIGHT - MARGIN - 40,
        { width: arrowWidth }
      );
    } else {
      doc.image(
        path.join(__dirname, "assets/images/arrow-up.png"),
        x + PAGE_WIDTH - MARGIN - arrowWidth + 8,
        y + MARGIN,
        { width: arrowWidth }
      );
    }
  }

  function createFoodSafety(x, y) {
    const warningText = "*ALLERGEN*";

    const width = doc.font(BOLD_SC).fontSize(24).widthOfString(warningText);

    doc
      .font(BOLD_SC)
      .fontSize(24)
      .text(warningText, x + PAGE_WIDTH / 2 - width / 2, y + 300);
  }

  return {
    render(x = 0, y = 0, stroke = true) {
      header(x, y);
      createLogo(x, y);
      createArrow(x, y);

      if (stroke) {
        doc.rect(x, y, PAGE_WIDTH, PAGE_HEIGHT).stroke();
      }

      const { isAllergen } = data.options;
      if (isAllergen) {
        createFoodSafety(x, y);
      }
    },
  };
};

export default {
  factory: Renderer,
  width: PAGE_WIDTH,
  height: PAGE_HEIGHT,
};
