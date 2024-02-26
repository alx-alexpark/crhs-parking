import { useLeafletContext } from '@react-leaflet/core';
import clsx from 'clsx';
import L, { LatLngBoundsExpression } from 'leaflet';
import { useEffect } from 'react';

import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import styles from './parking-map.module.scss';

import { MAP_DATA, Quadrant, RowData } from './map-data';

interface ParkingMapProps extends React.HTMLAttributes<HTMLDivElement> {}

const ENABLE_DEBUG = 0;

// TODO: this is a debug option
const LOW_BANDWIDTH = 0;

const layer = L.layerGroup();

let isDragging = false;

function OnClickHandler() {
  const map = useMap();

  if (map.listens('mouseup')) {
    return null;
  }

  map.addLayer(layer);

  // TODO: Leaflet inserts a Ukrainian flag to the attribution bar.
  //       While it would be best to avoid introducing politics to
  //       the app, there are no references to the war, hence it is
  //       not political.
  // map.attributionControl.setPrefix('');

  map.on('mouseup', function (e: any) {
    if (ENABLE_DEBUG) {
      console.log(`[${e.latlng.lat}, ${e.latlng.lng}],`);

      layer.clearLayers();
      L.circleMarker(e.latlng).addTo(layer);
    }
  });

  map.on('dragstart', () => (isDragging = true));
  map.on('dragend', () => (isDragging = false));

  return null;
}

function ParkingRow({ double, spaces, range, points: _points }: RowData) {
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

    if (ENABLE_DEBUG) {
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
    }

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

      L.polygon(
        coords.map((coord) => map.unproject(coord)),
        {
          color: '#35f',
          fill: true,
          fillOpacity: 0.2,
          weight: 0.5,
        }
      )
        .on(
          'mouseup',
          // Capture parkingSpot with a closure.
          // Top 10 TIPS for CAPTURING VARIABLES! ESLint HATES this code!
          ((spot) =>
            function (e: L.LeafletMouseEvent) {
              // Don't register spot if the user releases mouse while dragging
              if (isDragging) {
                return;
              }

              console.log(spot);
            })(parkingSpot)
        )
        .on('mouseover', (e: L.LeafletMouseEvent) => {
          e.target.options.fillOpacity = 0.5;
          e.target.redraw();
        })
        .on('mouseout', (e: L.LeafletMouseEvent) => {
          e.target.options.fillOpacity = 0.2;
          e.target.redraw();
        })
        .addTo(layer);
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

export function ParkingMap(props: ParkingMapProps) {
  const bounds = [
    [29.74335, -95.78269],
    [29.74711, -95.77633],
  ] as LatLngBoundsExpression;

  return (
    <MapContainer
      center={[29.74523, -95.77971]}
      bounds={bounds}
      maxBounds={bounds}
      zoom={17}
      preferCanvas={true}
      renderer={L.canvas()}
      {...props} // Placed before className so we can add styles.mapContainer
      className={clsx(styles.mapContainer, props.className)}
    >
      {/* <SelectionDisplay /> */}

      <OnClickHandler />
      {!LOW_BANDWIDTH && (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={19}
          maxZoom={21}
        />
      )}

      <LayerGroup>
        {MAP_DATA.map((quadrant: Quadrant) =>
          quadrant.data.map((data: RowData) => <ParkingRow {...data} />)
        )}
      </LayerGroup>
    </MapContainer>
  );
}
