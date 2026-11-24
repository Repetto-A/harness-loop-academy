import { createFileRoute } from "@tanstack/react-router";
import { PresentationDeck } from "@/components/PresentationDeck";
import { slidesAdsClaseInvertida } from "@/slides/deck-ads-clase-invertida";

export const Route = createFileRoute("/ads-clase-invertida")({
  head: () => ({
    meta: [
      { title: "ADS · Clase invertida: del modelo de clases al MER" },
      {
        name: "description",
        content:
          "Persistencia, reglas de transformación del modelo de clases al MER y normalización.",
      },
    ],
  }),
  component: AdsClaseInvertida,
});

function AdsClaseInvertida() {
  return (
    <PresentationDeck
      slides={slidesAdsClaseInvertida}
      storageKey="slide-index-ads-clase-invertida"
      deckTitle="ADS · Clase invertida: del modelo de clases al MER"
    />
  );
}
