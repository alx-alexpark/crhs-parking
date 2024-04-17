import clsx from 'clsx';
import L, { LatLngBoundsExpression } from 'leaflet';
import { useState } from 'react';
import { Marker, useMap } from 'react-leaflet';

import { LayerGroup, MapContainer, TileLayer, Tooltip } from 'react-leaflet';
import { FullscreenControl } from 'react-leaflet-fullscreen';

import 'leaflet/dist/leaflet.css';
import styles from './parking-map.module.scss';

import { renderToString } from '@/app/util';
import { EnterFullScreenIcon, ExitFullScreenIcon } from '@radix-ui/react-icons';
import { HighlightSpots, MAP_DATA, Quadrant, RowData } from './map-data';
import ParkingRow from './parking-row';

export interface ParkingMapProps {
  spot: number | null;
  setSpot?: Function;
  height: number;
  interactive: boolean;
  className?: string;
  highlightSpots?: HighlightSpots;
}

const layer = L.layerGroup();

const TextMarker = ({
  position,
  text,
}: {
  position: L.LatLngTuple;
  text: string;
}) => {
  return (
    <Marker
      position={position}
      interactive={false}
      alt={text}
      icon={L.divIcon({ html: text })}
    />
  );
};

function MapEvents({
  setFullScreen,
  setDragging,
}: {
  setFullScreen: Function;
  setDragging: Function;
}) {
  const map = useMap();

  if (map.listens('mouseup')) {
    return null;
  }

  map.addLayer(layer);

  // NOTE: Leaflet inserts a Ukrainian flag to the attribution bar.
  //       While it would be best to avoid introducing politics to
  //       the app, there are no references to the war, hence it is
  //       not political.
  // map.attributionControl.setPrefix('');

  // map.on('mouseup', function (e: any) {
  //   console.log(`[${e.latlng.lat}, ${e.latlng.lng}],`);

  //   layer.clearLayers();
  //   L.circleMarker(e.latlng).addTo(layer);
  // });

  map.on('dragstart', () => setDragging(true));
  map.on('dragend', () => setDragging(false));

  map.on('enterFullscreen', () => setFullScreen(true));
  map.on('exitFullscreen', () => setFullScreen(false));

  return null;
}

export function ParkingMap({
  spot,
  setSpot,
  interactive,
  height,
  className,
  highlightSpots,
}: ParkingMapProps) {
  const enterFullScreenIcon = renderToString(<EnterFullScreenIcon />);
  const exitFullScreenIcon = renderToString(<ExitFullScreenIcon />);

  const bounds = [
    [29.74335, -95.78269],
    [29.74711, -95.77633],
  ] as LatLngBoundsExpression;

  const [isFullScreen, setFullScreen] = useState(false);
  const [isDragging, setDragging] = useState(false);

  return (
    <MapContainer
      center={[29.74523, -95.77971]}
      bounds={bounds}
      maxBounds={bounds}
      zoom={17}
      preferCanvas={true}
      renderer={L.canvas()}
      style={{ height }}
      className={clsx(styles.mapContainer, className)}
    >
      <MapEvents setFullScreen={setFullScreen} setDragging={setDragging} />

      <FullscreenControl
        content={isFullScreen ? exitFullScreenIcon : enterFullScreenIcon}
      />

      {/* <TileLayer */}
      {/*   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' */}
      {/*   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */}
      {/*   maxNativeZoom={19} */}
      {/*   maxZoom={22} */}
      {/* /> */}

      <LayerGroup>
        <TextMarker
          position={[29.746675644692775, -95.7774728536606]}
          text="Athletic lot"
        />
        <TextMarker
          position={[29.746358931757268, -95.77879250049591]}
          text="1600s"
        />
        <TextMarker
          position={[29.74497097209391, -95.78070223331453]}
          text="1200s"
        />
        <TextMarker
          position={[29.744616992729043, -95.78160345554352]}
          text="PAC"
        />
      </LayerGroup>

      <LayerGroup>
        {MAP_DATA.map((quadrant: Quadrant, topIndex: number) =>
          quadrant.data.map((data: RowData, botIndex: number) => (
            <ParkingRow
              activeSpot={spot}
              setSpot={setSpot}
              interactive={Boolean(interactive)}
              isDragging={isDragging}
              highlightSpots={highlightSpots}
              {...data}
              key={`${topIndex}${botIndex}`}
            />
          ))
        )}
      </LayerGroup>
    </MapContainer>
  );
}
