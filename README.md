# React - OpenLayers

> Do not try this at home, this is in 

This library brings a lightweight abstraction over open layers to allow for simpler usage in a react application.

## Credits

Credits goes to https://github.com/mbrown3321/openlayers-react-map, from which I took the initial code.

## Example usage

```tsx
import React, { FC } from 'react';
import { Layers, Map, TileLayer, View } from 'react-openlayers';
import OSM from 'ol/source/OSM';

const App: FC = () => <Map>
  <View options={{ center: [0, 0], zoom: 2 }} />
  <Layers>
    <TileLayer options={{ source: new OSM() }} />
  </Layers>
</Map>
```
