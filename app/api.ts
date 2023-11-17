const res = await fetch('http://app:5000/steam/redirectUrl', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

if (res.ok) {
  console.log(await res.json());
} else {
  console.log(res.statusText, res.status);
}
