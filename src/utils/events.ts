/**
 * Utility for fetching upcoming events from termine.di.day GraphQL API
 */

export interface EventLocation {
  street: string;
  locality: string;
  country: string;
  geom: string; // Format: "longitude;latitude"
}

export interface Event {
  id: string;
  title: string;
  beginsOn: string;
  url: string;
  physicalAddress: EventLocation;
}

export interface EventsResponse {
  events: {
    elements: Event[];
  };
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export function parseCoordinates(geom: string): [number, number] | null {
  const [lon, lat] = geom.split(";").map(Number);
  if (isNaN(lon) || isNaN(lat)) return null;
  // Leaflet expects [latitude, longitude]
  return [lat, lon];
}

/**
 * Fetch upcoming events from the GraphQL API
 * @param limit - Maximum number of events to fetch
 * @returns Array of events with location data
 */
export async function fetchUpcomingEvents(
  limit: number = 20,
): Promise<Event[]> {
  const query = `
    query {
      events(limit: ${limit}) {
        elements {
          id
          title
          beginsOn
          url
          physicalAddress {
            street
            locality
            country
            geom
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://termine.di.day/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse<EventsResponse> = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return [];
    }

    if (!result.data?.events?.elements) {
      return [];
    }

    return result.data.events.elements.filter(
      (event) =>
        event.physicalAddress?.geom &&
        parseCoordinates(event.physicalAddress.geom),
    );
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}
