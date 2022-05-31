mapboxgl.accessToken =
  "pk.eyJ1IjoicHJ5dG1ha3MiLCJhIjoiY2t1cGd1ODBwMWRuODMwdGg4ajE5ajliayJ9.VqWcp8UjOf5Psyjf-SzoDw";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/light-v10", // style URL
  center: [2.3364, 48.86091], // starting position [lng, lat]
  zoom: 15.7, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker({
  color: "#171717",
  draggable: true,
})
  .setLngLat([2.3364, 48.86091])
  .addTo(map);

const markerA = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3397, 48.8607])
  .addTo(map);

const markerB = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3333, 48.8602])
  .addTo(map);

const markerC = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.333, 48.8619])
  .addTo(map);

const markerD = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3365, 48.8625])
  .addTo(map);
