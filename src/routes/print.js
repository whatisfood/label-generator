import renderers from "../print_templates/constants/renderers";
import { createDoc } from "../utils/PDFUtils";
import lodash from "lodash";
import ShelfPack from "shelf-pack";
import { v4 as uuidv4 } from "uuid";

const createPage = (doc, width = 792, height = 612) => {
  console.log(width, height);

  doc
    .addPage({ margin: 0, size: [width, height] })
    .lineWidth(0.25)
    .fillOpacity(0.8)
    .strokeColor(0x000000)
    .dash(5, { space: 5 })
    .fillColor("defaultColor");
};

const buildCompressedPages = (doc, cards) => {
  const elementFromData = (packet) => {
    const renderer = renderers[packet.rendererId];

    return {
      id: packet.id,
      width: renderer.width,
      height: renderer.height,
    };
  };

  const buildPages = (boxes, acc = []) => {
    const packer = new ShelfPack(792, 612);
    if (boxes.length > 0) {
      const packedBoxes = packer.pack(boxes);
      const remaining = boxes.filter((box) => {
        return !packedBoxes.some((packedBox) => packedBox.id == box.id);
      });

      return buildPages(remaining, [
        ...acc,
        {
          plates: packedBoxes,
          pageSize: {
            width: packer.w,
            height: packer.h,
          },
        },
      ]);
    } else {
      return acc;
    }
  };

  lodash
    .chain(cards)
    .map((card) => {
      return {
        id: uuidv4(),
        rendererId: card.type.rendererId,
        card,
      };
    })

    .groupBy((packet) => packet.rendererId)
    .map((cards) => {
      const pages = buildPages(cards.map(elementFromData));
      const merged = pages.map((page) => {
        const data = page.plates.map((plate) => {
          const match = cards.find((card) => card.id == plate.id);
          return {
            x: plate.x,
            y: plate.y,
            data: match.card,
          };
        });

        return {
          plates: data,
          pageSize: page.pageSize,
        };
      });

      return merged;
    })

    .forEach((groupPages) => {
      groupPages.forEach((page) => {
        const { pageSize, plates } = page;

        createPage(doc, pageSize.width, pageSize.height);

        plates.forEach((plate) => {
          const card = plate.data;

          const {
            type: { rendererId },
          } = card;

          const renderer = renderers[rendererId].factory;
          renderer(doc, card).render(plate.x, plate.y);
        });
      });
    })
    .value();
};

export async function post(req, res, next) {
  const data = req.body;
  const { cards, singles } = data;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=dope.pdf");

  const doc = createDoc();

  doc.pipe(res);

  if (singles) {
    cards.forEach((card) => {
      const {
        type: { rendererId },
      } = card;

      const { factory, width, height } = renderers[rendererId];

      createPage(doc, width, height);
      factory(doc, card).render();
    });
  } else {
    buildCompressedPages(doc, cards);
  }

  doc.end();
}
