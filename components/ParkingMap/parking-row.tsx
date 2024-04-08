import { useLeafletContext } from '@react-leaflet/core';
import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { HighlightSpots, RowData, isHighlightedSpot } from './map-data';

let firstLoad = true; // TODO: persist coordinates

export default function ParkingRow({
  double,
  spaces,
  range,
  points: _points,
  activeSpot,
  setSpot = () => {},
  interactive = true,
  isDragging = true,
  highlightSpots,
}: RowData & {
  activeSpot: number | null;
  setSpot?: Function;
  interactive: boolean;
  isDragging: boolean;
  highlightSpots?: HighlightSpots;
}) {
  const context = useLeafletContext();
  const map = useMap();

  const points: {
    start: L.Point[];
    end: L.Point[];
  } = {
    start: _points.start.map((point) => map.project(point)),
    end: _points.end.map((point) => map.project(point)),
  };

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const layer = L.layerGroup();
    container.addLayer(layer);

    const polygons: Map<number, L.Polygon> = new Map();

    // Draw row
    let parkingSpot = range[0];
    let spacesIndex = 0;

    const midpointStart: L.Point = double
      ? points.start[0].add(points.start[1]).divideBy(2)
      : points.start[1];

    // Calculate width of the row from the range and if it's a double row
    const width = (range[1] - range[0] + 1 + spaces.length) / (double ? 2 : 1);

    const distStart = points.end[0].subtract(points.start[0]);
    const distEnd = points.end[1].subtract(points.start[1]);

    const offsetStart = distStart.divideBy(width);
    const offsetEnd = distEnd.divideBy(width);
    const offsetMid = offsetStart.add(offsetEnd).divideBy(2);

    /*
    // Debugging code: Highlight clicks and mark corners in parking spots
    const color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    for (const point of Object.values(points).flat()) {
      L.circleMarker(map.unproject(point), {
        color,
      }).addTo(layer);
    }
    L.polyline(
      [
        map.unproject(points.start[0]),
        map.unproject(points.start[1]),
        map.unproject(points.end[1]),
        map.unproject(points.end[0]),
        map.unproject(points.start[0]),
      ],
      { color }
    ).addTo(layer);
    const offset = distStart > distEnd ? offsetStart : offsetEnd;
    L.polyline(
      [
        map.unproject(points.start[0]),
        map.unproject(points.start[0].add(offset.multiplyBy(width))),
        map.unproject(points.start[1].add(offset.multiplyBy(width))),
        map.unproject(points.start[1]),
        map.unproject(points.start[0]),
      ],
      { color, opacity: 0.25 }
    ).addTo(layer);
    */

    function drawParkingSpot(
      start: L.Point,
      end: L.Point,
      offsetStart: L.Point,
      offsetEnd: L.Point,
      index: number
    ) {
      //  A  B
      //
      // A' B'
      const coords = [
        // A
        start.add(offsetStart.multiplyBy(index)),

        // A'
        start.add(offsetStart.multiplyBy(index + 1)),

        // B
        end.add(offsetEnd.multiplyBy(index + 1)),

        // B'
        end.add(offsetEnd.multiplyBy(index)),
      ];

      const polygon = L.polygon(
        coords.map((coord) => map.unproject(coord)),
        {
          color: '#35f',
          fill: true,
          weight: 0.2,
          fillOpacity: activeSpot === parkingSpot ? 0.5 : 0.2,
        }
      );

      if (activeSpot === parkingSpot && firstLoad) {
        firstLoad = false;
        // @ts-expect-error: This works
        map.fitBounds(polygon.getLatLngs());
      }

      if (interactive) {
        polygon
          .on(
            'mouseup',
            // Capture the current parkingSpot value with a closure
            ((thisSpot) =>
              function (e: L.LeafletMouseEvent) {
                // Don't select spot if the user releases mouse while dragging
                if (isDragging) {
                  return;
                }

                // Don't select spot if it is a special parking spot
                if (isHighlightedSpot(highlightSpots, thisSpot)) {
                  return;
                }

                // Unhighlight the previous selection
                if (activeSpot && polygons.has(activeSpot)) {
                  const polygon = polygons.get(activeSpot)!;
                  polygon.options.fillOpacity = 0.2;
                  polygon.redraw();
                }

                // Highlight the current selection
                e.target.options.fillOpacity = 0.5;
                e.target.redraw();
                //map.fitBounds(e.target.getLatLngs());

                // Updating parking spot state
                setSpot(thisSpot);
              })(parkingSpot)
          )
          .on('mouseover', (e: L.LeafletMouseEvent) => {
            e.target.options.fillOpacity = 0.5;
            e.target.redraw();
          })
          .on(
            'mouseout',
            ((thisSpot) =>
              function (e: L.LeafletMouseEvent) {
                if (activeSpot === thisSpot) return;
                e.target.options.fillOpacity = 0.2;
                e.target.redraw();
              })(parkingSpot)
          );
      }

      polygon.addTo(layer);
      polygons.set(parkingSpot, polygon);
    }

    function drawRow(
      startIndex: number,
      endIndex: number,
      start: L.Point,
      end: L.Point,
      offsetStart: L.Point,
      offsetEnd: L.Point
    ) {
      const offset = startIndex < endIndex ? 1 : -1;

      for (let i = startIndex; i != endIndex; i += offset) {
        const isSpace = parkingSpot == spaces[spacesIndex];

        // Mark the current space as read
        if (isSpace) {
          spacesIndex++;
          continue;
        }

        // Go to next parking spot if the current spot is not a space
        drawParkingSpot(start, end, offsetStart, offsetEnd, i);
        parkingSpot++;
      }
    }

    // Draw first row
    drawRow(0, width, points.start[0], midpointStart, offsetStart, offsetMid);

    // Draw second row if it exists
    if (double) {
      drawRow(
        width - 1,
        -1,
        midpointStart,
        points.start[1],
        offsetMid,
        offsetEnd
      );
    }

    return () => {
      container.removeLayer(layer);
    };
  });

  return null;
}
