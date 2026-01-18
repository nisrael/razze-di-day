import React, { useEffect, useState, useRef } from "react";
import {
  fetchUpcomingEvents,
  parseCoordinates,
  type Event,
} from "../utils/events";
import { LOCALE_MAP, type LANG } from "../consts";
import { useTranslations } from "../utils/i18n";

interface EventMapProps {
  lang: LANG;
}

export const EventMap: React.FC<EventMapProps> = ({ lang }) => {
  const t = useTranslations(lang);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchUpcomingEvents(50);

        if (fetchedEvents.length === 0) {
          setError(t.home.events_not_found);
          setEvents([]);
          return;
        }

        setEvents(fetchedEvents);
        setError(null);
      } catch (err) {
        setError(t.home.events_error_loading);
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      loadEvents();
    }
  }, [lang, mounted]);

  // Initialize map and add markers
  useEffect(() => {
    if (!mounted || loading || !mapContainer.current || events.length === 0) {
      return;
    }

    const initMap = async () => {
      try {
        // Load Leaflet CSS if not already loaded
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "/leaflet/leaflet.css";
          document.head.appendChild(link);
        }

        // Dynamically import Leaflet only on client side
        const L = (await import("leaflet")).default;

        if (!map.current && mapContainer.current) {
          // Calculate center based on events
          const coords = events
            .map((e) => parseCoordinates(e.physicalAddress.geom))
            .filter((c) => c !== null) as [number, number][];

          let center: [number, number] = [51.1657, 10.4515]; // Center of Germany
          if (coords.length > 0) {
            const avgLat =
              coords.reduce((sum, [lat]) => sum + lat, 0) / coords.length;
            const avgLon =
              coords.reduce((sum, [, lon]) => sum + lon, 0) / coords.length;
            center = [avgLat, avgLon];
          }

          // Create map with scroll wheel zoom disabled
          map.current = L.map(mapContainer.current, {
            scrollWheelZoom: false,
          }).setView(center, 5);

          // Enable scroll wheel zoom only when Ctrl (or Cmd on Mac) is pressed
          const onKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && map.current) {
              map.current.scrollWheelZoom.enable();
            }
          };

          const onKeyUp = (e: KeyboardEvent) => {
            if (!e.ctrlKey && !e.metaKey && map.current) {
              map.current.scrollWheelZoom.disable();
            }
          };

          document.addEventListener("keydown", onKeyDown);
          document.addEventListener("keyup", onKeyUp);

          // Store handlers for cleanup
          (map.current as any)._keyDownHandler = onKeyDown;
          (map.current as any)._keyUpHandler = onKeyUp;

          // Add tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(map.current);

          // Fix marker icons
          const icon = L.icon({
            iconUrl: "/leaflet/images/marker-icon.png",
            shadowUrl: "/leaflet/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          });

          // Add markers
          events.forEach((event) => {
            const coords = parseCoordinates(event.physicalAddress.geom);
            if (coords) {
              const marker = L.marker(coords, { icon }).addTo(map.current);

              const formatDate = (dateString: string): string => {
                const date = new Date(dateString);
                const options: Intl.DateTimeFormatOptions = {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Europe/Berlin",
                };

                return date.toLocaleDateString(
                  LOCALE_MAP[lang] || LOCALE_MAP.de,
                  options,
                );
              };

              const popupContent = `
                <div class="text-sm">
                  <h3 class="font-bold text-gray-900 mb-1">${event.title}</h3>
                  <p class="text-gray-700 mb-1">${formatDate(event.beginsOn)}</p>
                  <p class="text-gray-600 text-xs mb-2">
                    ${event.physicalAddress.street}<br/>
                    ${event.physicalAddress.locality}, ${event.physicalAddress.country}
                  </p>
                  <a href="${event.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                    ${t.home.events_more_info}
                  </a>
                </div>
              `;

              marker.bindPopup(popupContent);
            }
          });
        }
      } catch (err) {
        console.error("Error initializing map:", err);
      }
    };

    initMap();

    return () => {
      // Cleanup event listeners
      if (map.current) {
        const onKeyDown = (map.current as any)._keyDownHandler;
        const onKeyUp = (map.current as any)._keyUpHandler;
        if (onKeyDown) document.removeEventListener("keydown", onKeyDown);
        if (onKeyUp) document.removeEventListener("keyup", onKeyUp);
      }
    };
  }, [mounted, events, lang, loading]);

  if (!mounted || loading) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">{t.home.events_loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div
        ref={mapContainer}
        style={{ height: "500px", width: "100%" }}
        className="z-0"
      />
      <div className="bg-gray-50 p-3 border-t border-gray-200 text-sm text-gray-600">
        {t.home.events_count.replace("{count}", String(events.length))}
      </div>
    </div>
  );
};
