import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Reveal from "./Reveal";
import L from "leaflet";

// simple pin svg, no external asset
const pinSvg = encodeURIComponent(`
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s7-7.24 7-12A7 7 0 1 0 5 10c0 4.76 7 12 7 12z" fill="#60A5FA"/>
    <circle cx="12" cy="10" r="2.8" fill="white"/>
  </svg>
`);
const pinIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;charset=UTF-8,${pinSvg}`,
  iconSize: [36, 36],
  iconAnchor: [18, 34],
  popupAnchor: [0, -28],
});

// move map up slightly func
function OffsetCenter({ fractionFromTop = 1 / 3, animate = false }) {
  const map = useMap();

  React.useEffect(() => {
    const apply = () => {
      const h = map.getSize().y;
      const dy = h * (0.5 - fractionFromTop);
      map.panBy([0, dy], { animate });
    };

    if (map._loaded) apply();
    else map.once("load", apply);

    // keep it correct on resize
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [map, fractionFromTop, animate]);

  return null;
}

export default function ContactMap({
  // cape town constantia emporium
  center = [-34.02921607122474, 18.44504732517337],
  zoom = 12,
  address = "1st Floor Constantia Emporium, cnr Ladies Mile & Spaanschemat River Rd, Belle Constantia, 7806",
  title = "South Africa office",
}) {
  // dark tiles
  const darkTiles = useMemo(
    () => "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    []
  );

  // build maps link with the cords for easy update
  const gmapsUrl = useMemo(() => {
    const [lat, lng] = center || [];
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
  }, [center, address]);

  // styles just for the map
  const scopedCss = `
    .iris-map { position: relative; }
    /* hide leaflet attribution + the little "leaflet" tag */
    .iris-map .leaflet-control-container .leaflet-control-attribution,
    .iris-map .leaflet-control-container .leaflet-control a[href*="leaflet"] {
      display: none !important;
    }
    .iris-map .leaflet-container {
      border-radius: 1rem;
      overflow: hidden;
    }

    /* make whole card behave like a button/link */
    .iris-map .addr-card-link {
      display: block;
      text-decoration: none;
      color: inherit;
      border-radius: 1rem;
      outline: none;
    }
    .iris-map .addr-card-link:focus-visible {
      box-shadow: 0 0 0 3px rgba(37, 99, 235, .8);
    }
    .iris-map .addr-card-link:hover .addr-card {
      transform: translateY(-2px);
    }
    .iris-map .addr-card {
      transition: transform .18s ease, box-shadow .18s ease;
    }
  `;

  return (
    <section className="relative mt-16">
      {/* dots */}
      <Reveal direction="down" duration={1400} distance={20} delay={100}>
        <div className="mt-5 mx-auto mb-4 h-1 w-1 rounded-full bg-blue-600 opacity-33" />
      </Reveal>
      <Reveal direction="down" duration={1800} distance={20} delay={200}>
        <div className="mt-[-0.5rem] mx-auto mb-4 h-1 w-1 rounded-full bg-blue-600 opacity-66" />
      </Reveal>
      <Reveal direction="down" duration={2200} distance={20} delay={300}>
        <div className="mt-[-0.5rem] mx-auto mb-4 h-1 w-1 rounded-full bg-blue-600 opacity-66" />
      </Reveal>

      {/* header */}
      <div className="text-center mb-6">
        <Reveal direction="down" duration={2000} distance={40}>
          <div className="eyebrow text-white/70">you can find us at our</div>
        </Reveal>
        <Reveal direction="down" duration={2000} distance={40}>
          <h2 className="h2 mt-2">{title}</h2>
        </Reveal>
      </div>

      {/* map */}
        <div className="iris-map relative mx-auto max-w-[1100px] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            attributionControl={false}
            className="h-[520px] w-full z-0"
            style={{ background: "#0b0e1a" }}
          >
            <TileLayer url={darkTiles} />
            <Marker position={center} icon={pinIcon}>
              <Popup>
                <div className="text-sm">
                  <strong>IRIS Network Systems</strong>
                  <div className="mt-1">{address}</div>
                </div>
              </Popup>
            </Marker>
            <OffsetCenter fractionFromTop={1 / 3} />
          </MapContainer>

          {/* floating address card */}
          <div className="pointer-events-none absolute left-1/2 bottom-6 -translate-x-1/2 z-[500]">
            <a
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="addr-card-link pointer-events-auto max-w-[680px]"
              aria-label="open address in google maps"
              title="open in google maps"
            >
              <div className="addr-card rounded-2xl border border-white/10 bg-black/60 backdrop-blur px-6 py-5 text-center shadow-2xl">
                {/* little pin */}
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/90">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 22s7-7.24 7-12A7 7 0 1 0 5 10c0 4.76 7 12 7 12z"
                      fill="white"
                      opacity="0.9"
                    />
                    <circle cx="12" cy="10" r="2.6" fill="#2563EB" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">address</div>
                <div className="mt-1 text-white/90">{address}</div>
                <div className="mt-2 text-sm text-white/60">
                  open in google maps →
                </div>
              </div>
            </a>
          </div>
        </div>

      <style dangerouslySetInnerHTML={{ __html: scopedCss }} />
    </section>
  );
}
